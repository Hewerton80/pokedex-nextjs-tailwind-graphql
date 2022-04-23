import { faker } from '@faker-js/faker'
import { IRowDatas } from './fieldTypeOptios'

interface IGenerateFakeDatasArgs {
  fields: IRowDatas[]
  numRows: number
}
export const generateFateDates = ({ numRows, fields }: IGenerateFakeDatasArgs) => {
  return new Promise((resolve, reject) => {
    const rowDates = []
    for (let i = 0; i < numRows; i++) {
      let fieldsNames: any = {}
      for (const field of fields) {
        // @ts-ignore:next-line
        fieldsNames[field.fieldName] = faker?.[field.groupType]?.[field.fieldType]?.()
      }
      rowDates.push(fieldsNames)
    }
    resolve(rowDates)
  })
}
