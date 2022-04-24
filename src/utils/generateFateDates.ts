import { dalay } from './dalay'
import { faker } from './faker'
import { IRowDatas } from './fieldTypeOptios'

interface IGenerateFakeDatasArgs {
  fields: IRowDatas[]
  numRows: number
}
export const generateFateDates = async ({ numRows, fields }: IGenerateFakeDatasArgs) => {
  const rowDates = []
  await dalay(0)
  for (let i = 0; i < numRows; i++) {
    let fieldsNames: any = {}
    for (const field of fields) {
      // @ts-ignore:next-line
      fieldsNames[field.fieldName] = faker?.[field.groupType]?.[field.fieldType]?.()
    }
    rowDates.push(fieldsNames)
  }
  return rowDates
}
