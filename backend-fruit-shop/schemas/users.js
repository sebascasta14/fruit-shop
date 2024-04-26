import z from 'zod'

const userSchema = z.object({
  username: z.string({
    invalid_type_error: 'username must be a string',
    required_error: 'username title is required.'
  }),
  password: z.string(),
  shoppingcart: z.object()
})

export function validateUser (input) {
  return userSchema.safeParse(input)
}

export function validatePartialUser (input) {
  return userSchema.partial().safeParse(input)
}
