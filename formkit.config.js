import { generateClasses } from '@formkit/themes'

export default {
  config: {
    classes: generateClasses({
      global: {
        label: 'text-neutral-700',
        message: 'text-red-500 text-sm mt-1',
        input:
          'mt-1 block w-full rounded-md bg-neutral-100 border-transparent focus:border-neutral-500 focus:bg-white focus:ring-0',
      },
      text: {},
      file: {
        input:
          '$reset mt-1 block w-full text-sm text-neutral-500 file:text-sm file:font-semibold file:py-2 file:px-4 file:bg-green-50 file:text-green-700 file:rounded-full file:border-0 file:mr-4 hover:file:bg-green-100',
        noFiles: 'mt-1 text-sm text-neutral-500',
        fileItem: 'hidden',
      },
      select: {},
      number: {},
      submit: {
        input: '$reset btn btn-primary',
      },
    }),
  },
}
