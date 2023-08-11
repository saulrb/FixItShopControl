import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Button } from '@fixitshopcontrol/design-system'

type Props = {
  locale: string
}

const Page: FC<Props> = ({ locale }) => {
  return (
    <h1>
      Login Page - {locale}
      <Button>Login</Button>
    </h1>
  )
}

export const getServerSideProps = async ({ req }: any) => ({
  props: {
    locale: req.params.locale
  }
})

export default Page
