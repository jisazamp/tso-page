import { z, ZodType } from 'zod'

export type SignInFormData = {
  username: string
  password: string
}

export const SignInUserSchema: ZodType<SignInFormData> = z.object({
  username: z.string().email('El correo no es válido'),
  password: z.string().min(8, {
    message: 'La contraseña debe contener como mínimo 8 caracteres',
  }),
})
