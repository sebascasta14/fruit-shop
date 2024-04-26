import z from 'zod'

const fruitSchema = z.object({
  name: z.string({
    invalid_type_error: 'Fruit must be a string',
    required_error: 'Fruit is required.'
  }),
  price: z.number().int().min(0),
  image: z.string().url({
    message: 'Poster must be a valid URL'
  })
})

export function validateFruit (input) {
  return fruitSchema.safeParse(input)
}

export function validatePartialFruit (input) {
  return fruitSchema.partial().safeParse(input)
}
