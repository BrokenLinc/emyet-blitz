import React from "react"
import _ from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons"

import { useRouter } from "next/router"
import * as UI from "@chakra-ui/react"
import Highlighter from "react-highlight-words"

export const ITEMS_PER_PAGE = 30

export const useRouterPage = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0

  const goToPreviousPage = () => router.push({ query: { ...router.query, page: page - 1 } })
  const goToNextPage = () => router.push({ query: { ...router.query, page: page + 1 } })
  const queryParams = {
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  }
  return {
    current: page,
    isFirst: page === 0,
    prev: goToPreviousPage,
    next: goToNextPage,
    queryParams,
  }
}

// type Page = ReturnType<typeof useRouterPage>

export const useRouterBoolean = (paramName: string, hiddenValue: boolean = false) => {
  const router = useRouter()
  const value = _.flatten([router.query[paramName]])[0] === "true"
  const pageOneQuery = _.omit(router.query, "page") // reset paging

  const toggle = () => {
    const newValue = !value
    if (newValue === hiddenValue) {
      router.push({ query: { ..._.omit(pageOneQuery, paramName) } })
    } else {
      router.push({ query: { ...pageOneQuery, [paramName]: newValue } })
    }
  }
  return {
    value,
    toggle,
  }
}

export const useRouterDeleted = () => {
  return useRouterBoolean("deleted", false)
}

export const useRouterString = (paramName: string) => {
  const router = useRouter()
  const value = _.flatten([router.query[paramName]])[0] || ""
  const pageOneQuery = _.omit(router.query, "page") // reset paging

  const set = (newValue: string) => {
    if (newValue === "") {
      router.push({ query: { ..._.omit(pageOneQuery, paramName) } })
    } else {
      router.push({ query: { ...pageOneQuery, [paramName]: newValue } })
    }
  }
  return {
    value,
    set,
  }
}

export function useRouterSearch<T extends string>(fields: T[]) {
  const search = useRouterString("search")
  const queryOrs = fields.map((field) => {
    return {
      [field]: { contains: search.value, mode: "insensitive" },
    }
  })
  const queryWhereParams = {
    OR: queryOrs,
  }
  return {
    ...search,
    queryWhereParams,
  }
}

export const HighlightHeading: React.FC<
  UI.HeadingProps & { children?: string | null; search: string }
> = ({ children, search, ...headingProps }) => {
  const text = children || ""
  return (
    <UI.Heading {...headingProps}>
      <Highlighter highlightClassName="highlighter" searchWords={[search]} textToHighlight={text} />
    </UI.Heading>
  )
}

export const HighlightText: React.FC<
  UI.TextProps & { children: string | null; search: string }
> = ({ children, search, ...textProps }) => {
  const text = children || ""
  return (
    <UI.Text {...textProps}>
      <Highlighter highlightClassName="highlighter" searchWords={[search]} textToHighlight={text} />
    </UI.Text>
  )
}

export const AdminList: React.FC<UI.SimpleGridProps> = (gridProps) => {
  return <UI.SimpleGrid minChildWidth="280px" spacing={4} {...gridProps} />
}

export const AdminListItem = React.forwardRef<
  HTMLDivElement,
  UI.StackProps & {
    title: string
    search?: string
    isDeleted?: boolean
  }
>(({ title, search = "", isDeleted, children, ...stackProps }, ref) => {
  return (
    <UI.VStack
      ref={ref}
      as="a"
      alignItems="start"
      bg="gray.50"
      border="2px solid transparent"
      borderRadius="md"
      _hover={{ borderColor: "blue.500" }}
      p={4}
      pt={3}
      {...stackProps}
    >
      <HighlightText fontWeight="500" search={search}>
        {title || "-Untitled-"}
      </HighlightText>
      <UI.Box fontSize="sm" color="gray.500">
        {children}
        {isDeleted ? <UI.Text color="red.500">(deleted)</UI.Text> : null}
      </UI.Box>
    </UI.VStack>
  )
})

export const Pagination: React.FC<{ hasMore?: boolean }> = ({ hasMore }) => {
  const page = useRouterPage()
  return (
    <UI.ButtonGroup size="sm" isAttached variant="outline">
      <UI.Button isDisabled={page.isFirst} onClick={page.prev}>
        Previous
      </UI.Button>
      <UI.Button isDisabled={!hasMore} onClick={page.next}>
        Next
      </UI.Button>
    </UI.ButtonGroup>
  )
}

export const AdminSearch: React.FC<UI.InputGroupProps & { searchFields: string[] }> = ({
  searchFields,
  ...inputGroupProps
}) => {
  const search = useRouterSearch(searchFields)
  const [searchInputValue, setSearchInputValue] = React.useState(search.value)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  const onSearchSubmit = (e) => {
    e.preventDefault()
    search.set(searchInputValue)
  }

  const handleClearClick = () => {
    setSearchInputValue("")
    search.set("")
  }

  return (
    <UI.InputGroup as="form" onSubmit={onSearchSubmit} {...inputGroupProps}>
      <UI.InputLeftElement>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </UI.InputLeftElement>
      <UI.Input value={searchInputValue} onChange={handleSearchChange} onBlur={onSearchSubmit} />
      <UI.InputRightElement>
        <UI.IconButton
          aria-label="clear"
          variant="ghost"
          icon={<FontAwesomeIcon icon={faTimes} />}
          onClick={handleClearClick}
        />
      </UI.InputRightElement>
    </UI.InputGroup>
  )
}

export const AdminDeletedToggle = () => {
  const isDeleted = useRouterDeleted()
  return (
    <UI.Box px={2}>
      <UI.Checkbox isChecked={isDeleted.value} onChange={isDeleted.toggle}>
        Show deleted
      </UI.Checkbox>
    </UI.Box>
  )
}
