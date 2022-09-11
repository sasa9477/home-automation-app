import { MenuItem, MenuItemProps } from "@mui/material"
import NextLink from "next/link"
import { forwardRef } from "react"

type LinkMenuItemProps = Omit<MenuItemProps<'a', { href: string }>, 'component' | 'button'>

const LinkMenuItem = forwardRef<HTMLAnchorElement, LinkMenuItemProps>(
  function LinkMenuItem(props, forwardRef) {
    const {
      href,
      ...other
    } = props
    return (
      <NextLink href={href}>
        <MenuItem
          component='a'
          ref={forwardRef}
          {...other} />
      </NextLink>
    )
  }
);

export default LinkMenuItem
