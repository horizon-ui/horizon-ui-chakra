import React from 'react'
import {
  ThemeEditor as ThemeEditorContainer,
  ThemeEditorDrawer,
  ThemeEditorColors,
  ThemeEditorFontSizes
} from '@hypertheme-editor/chakra-ui'
import { Button, Icon } from '@chakra-ui/react'
import { CgColorPicker } from 'react-icons/cg'
import { ImFontSize } from 'react-icons/im'
import { MdPalette } from 'react-icons/md'

export function ThemeEditor(props) {
    return (
        <ThemeEditorContainer>
          <ThemeEditorButton {...props} />
          <ThemeEditorDrawer hideUpgradeToPro>
            <ThemeEditorColors icon={CgColorPicker} title="Colors" />
            <ThemeEditorFontSizes icon={ImFontSize} title="Font Sizes" />
          </ThemeEditorDrawer>
        </ThemeEditorContainer>
      )
}

function ThemeEditorButton({ onOpen, navbarIcon, ...rest }) {
  return (
    <Button
        variant='no-hover'
        bg='transparent'
        p='0px'
        minW='unset'
        minH='unset'
        h='18px'
        w='max-content'
        _focus={{ boxShadow: 'none' }}
        onClick={onOpen}
        {...rest}
    >
        <Icon
            me='10px'
            h='18px'
            w='18px'
            color={navbarIcon}
            as={MdPalette}
        />
      </Button>
  )
}