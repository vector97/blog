import { ErrorMessage } from '@hookform/error-message'
import _ from 'lodash'

export const errorHandler = (name, errors) => (
  <ErrorMessage
    errors={errors}
    name={name}
    render={({ messages }) =>
      messages ? _.entries(messages).map(([type, message]) => <p key={type}>{message}</p>) : null
    }
  />
)
