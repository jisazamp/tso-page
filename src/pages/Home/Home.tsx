// @ts-expect-error this file has no declaration
import Quiz from '@juanisazam/react-quiz-component'
import { Box, Button, Chip, Typography } from '@mui/material'
import { User, onAuthStateChanged } from 'firebase/auth'
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from 'firebase/firestore'
import React from 'react'
import { auth, db } from '../../config'

const spanishAppLocale = {
  landingHeaderText: '<questionLength> preguntas',
  question: 'Pregunta',
  startQuizBtn: 'Iniciar examen',
  resultFilterAll: 'Todas',
  resultFilterCorrect: 'Correctas',
  resultFilterIncorrect: 'Incorrectas',
  resultFilterUnanswered: 'Sin responder',
  prevQuestionBtn: 'Anterior',
  nextQuestionBtn: 'Siguiente',
  resultPageHeaderText:
    'Intento completado. Obtuviste <correctIndexLength> respuestas correctas sobre un total de <questionLength> preguntas.',
  singleSelectionTagText: 'Única respuesta',
  pickNumberOfSelection: 'Elige 1',
  multipleSelectionTagText: 'Selección múltiple',
  resultPagePoint: 'Tu calificación es de <correctPoints> sobre <totalPoints>.',
  timerTimeRemaining: 'Tiempo restante',
  timerTimeTaken: 'Tiempo tomado',
  marksOfQuestion: '(<marks> puntos)',
}

export const Home = () => {
  const [user, setUser] = React.useState<User | null>(null)
  const [exams, setExams] = React.useState<DocumentData[]>([])
  const [userTries, setUserTries] = React.useState<DocumentData[]>([])

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        return
      }

      setUser(null)
    })

    return () => unsubscribe()
  }, [])

  React.useEffect(() => {
    const fetchExams = async () => {
      const triesRef = await getDocs(collection(db, 'exams'))
      const examsData = triesRef.docs.map((doc) => doc.data())
      setExams(examsData)
    }

    fetchExams()
  }, [])

  React.useEffect(() => {
    if (!user) return

    const fetchUserTries = async () => {
      const q = query(collection(db, 'tries'), where('userId', '==', user.uid))
      const triesDataRef = await getDocs(q)
      const triesData = triesDataRef.docs.map((doc) => doc.data())
      setUserTries(triesData)
    }

    fetchUserTries()
  }, [user])

  const updateNumberOfTries = async () => {
    if (!user || !exams) return
    await setDoc(doc(db, 'tries', user.uid + exams[0].id), {
      examId: exams[0].id,
      userId: user?.uid,
      numberOfTries: userTries?.[0]?.numberOfTries
        ? userTries?.[0]?.numberOfTries + 1
        : 1,
    })
  }

  if (!user || !exams) return

  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.default',
          marginTop: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& .startQuizBtn': {
            marginTop: 2,
            transition: 'all 0.2s ease-in',
          },
          '& .startQuizBtn:hover': {
            transform: 'scale(1.05)',
          },
          '& .startQuizBtn:active': {
            transform: 'scale(0.95)',
          },
        }}
      >
        {exams.map((e) => {
          return (
            <Box
              key={JSON.stringify(e)}
              display='flex'
              flexDirection='column'
              position='relative'
              sx={{ paddingTop: 5 }}
            >
              <Chip
                variant='outlined'
                label={`${userTries[0]?.numberOfTries ?? 0} de ${
                  e.triesAllowed
                } intentos completados`}
                sx={{ position: 'absolute', right: 10, top: 10 }}
              />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: 1,
                  marginRight: 1,
                }}
              >
                <Button
                  variant='contained'
                  onClick={() => window.location.reload()}
                >
                  Refrescar
                </Button>
              </Box>

              {userTries?.[0]?.numberOfTries === e.triesAllowed ? (
                <Typography
                  sx={{ marginTop: 7, padding: '1em', textAlign: 'center' }}
                >
                  Ya completaste el máximo de intentos permitidos para este
                  examen
                </Typography>
              ) : (
                <Quiz
                  onComplete={() => updateNumberOfTries()}
                  quiz={{ ...e, appLocale: spanishAppLocale }}
                  allowNavigation={true}
                  showInstantFeedback={false}
                />
              )}
            </Box>
          )
        })}
      </Box>
    </>
  )
}
