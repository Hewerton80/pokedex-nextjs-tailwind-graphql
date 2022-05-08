import { HTMLAttributes, useCallback, useMemo } from 'react'
import Button from '../../forms/Button'
import cn from 'classnames'
import styles from './styles.module.css'
import { getRange } from '../../../../utils/getRange'
// import { getBodyElement } from '../../../../utils/getBodyElement'

interface PaginationBarProps extends HTMLAttributes<HTMLDivElement> {
  currentPage: number
  totalPages: number
  totalRecords: number
  perPage: number
  disabled?: boolean
  hidden?: boolean
  onChangePage: (toPage: number) => void
}

function PaginationBar({
  className,
  totalPages,
  currentPage,
  totalRecords,
  perPage,
  disabled,
  hidden = false,
  onChangePage,
  ...rest
}: PaginationBarProps) {
  const paginationLabel = useMemo(() => {
    const startRange = (currentPage - 1) * perPage + 1
    let endRange = (currentPage - 1) * perPage + perPage
    endRange = endRange < totalRecords ? endRange : totalRecords
    return (
      <>
        Resultados da Busca {startRange}
        {' - '}
        {endRange} de {totalRecords}
      </>
    )
  }, [currentPage, perPage, totalRecords])

  const arrayPagesItens = useMemo(() => {
    const maximumNumberOfButtonsToNavigate = 5
    let initialIndexPage =
      parseInt(String(currentPage / maximumNumberOfButtonsToNavigate)) *
      maximumNumberOfButtonsToNavigate
    initialIndexPage = initialIndexPage > 0 ? initialIndexPage - 1 : 0

    return getRange(totalPages).slice(
      initialIndexPage,
      initialIndexPage + maximumNumberOfButtonsToNavigate
    )
  }, [currentPage, totalPages])

  const handleChangePage = useCallback(
    (toPage: number) => {
      onChangePage(toPage)
      // const bodyElement = getBodyElement()
      // if (bodyElement && document?.documentElement) {
      //   bodyElement.scrollTop = 0
      //   document.documentElement.scrollTop = 0
      // }
    },
    [onChangePage]
  )

  if (hidden) {
    return <></>
  }

  return (
    <div className={cn(styles.root, className)} {...rest}>
      <span className="dark:text-light">{paginationLabel}</span>
      {totalPages > 0 && (
        <>
          <ul className="flex">
            <li>
              <Button
                className={cn('border-l-0 ', 'dark:bg-dark-card dark:border-dark-card')}
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1 || disabled}
              >
                {'<'}
              </Button>
            </li>
            {arrayPagesItens.map((page, i) => (
              <li
                key={i + 'page'}
                className={cn(currentPage === page + 1 && styles.active)}
              >
                <Button
                  className={cn(
                    i > 0 && 'border-l-0 ',
                    'dark:bg-dark-card dark:border-dark-card'
                  )}
                  disabled={disabled}
                  onClick={() => i + 1 !== currentPage && handleChangePage(page + 1)}
                >
                  {page + 1}
                </Button>
              </li>
            ))}
            <li>
              <Button
                className={cn('border-l-0 ', 'dark:bg-dark-card dark:border-dark-card')}
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={currentPage === totalPages || disabled}
              >
                {'>'}
              </Button>
            </li>
          </ul>
        </>
      )}
    </div>
  )
}

export default PaginationBar
