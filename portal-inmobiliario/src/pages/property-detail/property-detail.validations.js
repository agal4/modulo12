import { Validators, createFormValidation } from '@lemoncode/fonk';
const validationSchema = {
    field: {
        email: [
            {
              validator: Validators.email,
              message: 'Email no válido',
            },
          ],
          message: [],
    },
};
export const formValidation = createFormValidation(validationSchema);
