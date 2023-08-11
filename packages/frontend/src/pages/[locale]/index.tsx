import { useRouter } from 'next/router'
import React, { FC } from 'react'

const Page: FC = () => {
  const router = useRouter()
  const { locale } = router.query

  return <h1>Index page {locale}</h1>
}

export default Page
