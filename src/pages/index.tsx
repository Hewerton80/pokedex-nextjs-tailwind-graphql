import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useState, useCallback, useMemo, ChangeEvent, useEffect, FormEvent } from 'react'
import FormGroup from '../components/ui/forms/FormGroup'
import FormLabel from '../components/ui/forms/FormLabel'
import InputText from '../components/ui/forms/InputText'
import Select from '../components/ui/forms/Select'
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/layout/Card'
import { getRange } from '../utils/getRange'
import { AvailableGroupTypes, fieldTypeOptios, IRowDatas } from '../utils/fieldTypeOptios'
import Button from '../components/ui/forms/Button'
import { generateFateDates } from '../utils/generateFateDates'
import IconButton from '../components/ui/forms/IconButton'
import { FaPlus } from 'react-icons/fa'
import { BsXLg } from 'react-icons/bs'
import Form from '../components/ui/forms/Form'
import classNames from 'classnames'

// import ReactJson from 'react-json-view'

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
})

// const MonacoEditor = dynamic(() => import('react-monaco-editor'), {
//   ssr: false,
//   loading: () => <p>...</p>,
// })

interface IChangeFieldNameValue {
  index: number
  value: string
}

interface IChangeFieldTypeValue {
  index: number
  e: ChangeEvent<HTMLSelectElement>
}

const Home: NextPage = () => {
  const [rowDatas, setRowDatas] = useState<IRowDatas[]>([
    {
      fieldName: 'id',
      fieldType: 'uuid',
      groupType: 'datatype',
    },
    {
      fieldName: 'user-name',
      fieldType: 'findName',
      groupType: 'name',
    },
    {
      fieldName: 'avatar',
      fieldType: 'avatar',
      groupType: 'image',
    },
    {
      fieldName: 'gender',
      fieldType: 'gender',
      groupType: 'name',
    },
    {
      fieldName: 'phone-number',
      fieldType: 'phoneNumber',
      groupType: 'phone',
    },
    {
      fieldName: 'zip-code',
      fieldType: 'zipCode',
      groupType: 'address',
    },
    {
      fieldName: 'birth-date',
      fieldType: 'past',
      groupType: 'date',
    },
    // { fieldName: 'Sobre nome', fieldType: 'Last Name', groupType: 'name' },
  ])
  const [numberRowToGanerate, setNumberRowToGanerate] = useState('10')
  const [generedfakeDatas, setGeneredfakeDatas] = useState('')

  const [isGeneringFakeDatas, setIsGeneringFakeDatas] = useState(false)

  const selectOptions = useMemo(
    () =>
      fieldTypeOptios.map((option, i) => (
        <optgroup className="text-dark" key={option.type + i} label={option.type}>
          {option.subtypes.map((subtype, j) => (
            <option className="text-dark" key={subtype + i + j} value={subtype}>
              {subtype}
            </option>
          ))}
        </optgroup>
      )),
    []
  )

  const handleChangeFieldName = useCallback(({ index, value }: IChangeFieldNameValue) => {
    setRowDatas(([...currentRowDatas]) => {
      currentRowDatas[index].fieldName = value
      return currentRowDatas
    })
  }, [])

  const handleChangeFieldType = useCallback(({ index, e }: IChangeFieldTypeValue) => {
    setRowDatas(([...currentRowDatas]) => {
      const indexElement = e.target.selectedIndex
      const option = e.target.options[indexElement]
      const optgroup = option.parentElement
      const groupType = optgroup?.getAttribute('label')
      currentRowDatas[index].fieldType = e.target.value
      currentRowDatas[index].groupType = groupType as AvailableGroupTypes
      return currentRowDatas
    })
  }, [])

  const handleAddRow = useCallback(() => {
    setRowDatas(([...currentRowDatas]) => {
      const lastRowDate = currentRowDatas[currentRowDatas.length - 1]
      currentRowDatas.push({ ...lastRowDate })
      return currentRowDatas
    })
  }, [])

  const handleRemoveRowByIndex = useCallback((index: number) => {
    setRowDatas(([...currentRowDatas]) => {
      currentRowDatas.splice(index, 1)
      return currentRowDatas
    })
  }, [])

  const handleGenerateFakeDatas = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsGeneringFakeDatas(true)
      const response = await generateFateDates({
        fields: rowDatas,
        numRows: Number(numberRowToGanerate),
      })
      setGeneredfakeDatas(JSON.stringify(response))
      setIsGeneringFakeDatas(false)
    },
    [rowDatas, numberRowToGanerate]
  )

  const rowDataListElement = useMemo(() => {
    return getRange(rowDatas.length).map((_, i) => {
      const isFirstIndex = i === 0
      return (
        <div className="flex items-center space-x-2" key={i + 'row'}>
          <FormGroup className="max-w-[240px] w-full">
            <InputText
              value={rowDatas[i].fieldName}
              required
              onChange={(e) => handleChangeFieldName({ index: i, value: e.target.value })}
              autoFocus
            />
          </FormGroup>
          <FormGroup className="max-w-[240px] w-full">
            <Select
              value={rowDatas[i].fieldType}
              onChange={(e) => handleChangeFieldType({ index: i, e })}
              required
            >
              {selectOptions}
            </Select>
          </FormGroup>
          {!isFirstIndex && (
            <IconButton
              variant="danger"
              icon={<BsXLg />}
              onClick={() => handleRemoveRowByIndex(i)}
            />
          )}
        </div>
      )
    })
  }, [
    rowDatas,
    selectOptions,
    handleRemoveRowByIndex,
    handleChangeFieldName,
    handleChangeFieldType,
  ])

  const reactJsonViewElement = useMemo(() => {
    return (
      <div className={classNames(!generedfakeDatas && 'hidden')}>
        <ReactJson
          src={generedfakeDatas ? JSON.parse(generedfakeDatas) : {}}
          theme="monokai"
          displayDataTypes={false}
        />
      </div>
    )
  }, [generedfakeDatas])

  return (
    <div className="flex justify-center w-full h-full">
      <Card className="max-w-7xl w-full mb-16">
        <CardHeader>
          <CardTitle>Gerador de dados fakes</CardTitle>
        </CardHeader>
        <CardBody>
          <Form className="mb-4" onSubmit={handleGenerateFakeDatas}>
            <div className="flex flex-col space-y-2 mb-12">
              <div className="flex items-end space-x-2">
                <FormLabel className="max-w-[240px] w-full">Nome do Campo</FormLabel>
                <FormLabel className="max-w-[240px] w-full">Tipo do Campo</FormLabel>
              </div>
              {rowDataListElement}
              <IconButton variant="primary" icon={<FaPlus />} onClick={handleAddRow} />
            </div>
            <div className="flex items-end space-x-4">
              <Button variant="primary" type="submit" isLoading={isGeneringFakeDatas}>
                Gerar dados fakes
              </Button>
              <FormGroup className="max-w-[240px] w-full">
                <FormLabel>Número de dados</FormLabel>
                <InputText
                  type="number"
                  min={0}
                  max={50}
                  value={numberRowToGanerate}
                  onChange={(e) => setNumberRowToGanerate(e.target.value)}
                />
              </FormGroup>
            </div>
          </Form>
          {reactJsonViewElement}
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
