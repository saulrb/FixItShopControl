// // import { getCurrentLanguage } from '@contentpi/lib'
// import React, { FC, ReactElement } from 'react'
// import { Link as RouterLink } from 'react-router-dom'
// import styled from 'styled-components'

// type Props = {
//   children: ReactElement | string
//   to: string
//   className?: string
//   onClick?(): void
//   title?: string
//   target?: '_blank' | '_self' | '_parent' | '_top'
//   external?: boolean
//   withLanguage?: boolean
// }

// type LinkProps = {
//   onClick?(): void
//   className?: string
//   target?: '_blank' | '_self' | '_parent' | '_top'
//   rel?: string
//   href?: string
//   to?: string
// }

// const StyledLink = styled.a`
//   text-decoration: none;
// `

// const StyledRouterLink = styled(RouterLink)`
//   text-decoration: none;
// `

// const Link: FC<Props> = ({
//   to,
//   children,
//   className,
//   onClick,
//   title = '',
//   target = undefined,
//   external = false,
//   withLanguage = false
// }) => {
//   // const currentLanguage = getCurrentLanguage()
//   let href = to
//   const linkProps: LinkProps = {
//     onClick,
//     className,
//     target
//   }

//   if (withLanguage) {
//     const slash = href.charAt(0) === '/' ? '' : '/'
//     // href = `${currentLanguage}${slash}${href}`
//   }

//   if (typeof children === 'string') {
//     title = children
//   }

//   if (target === '_blank') {
//     linkProps.rel = 'noopener noreferrer nofollow'
//   }

//   if (external) {
//     linkProps.href = href

//     return (
//       <StyledLink {...linkProps} title={title}>
//         {children}
//       </StyledLink>
//     )
//   }

//   return (
//     <StyledRouterLink to={href} title={title} {...linkProps}>
//       {children}
//     </StyledRouterLink>
//   )
// }

// export default Link
