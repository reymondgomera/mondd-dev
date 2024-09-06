import { cx } from 'class-variance-authority'
import { common, createLowlight } from 'lowlight'
import { v4 as uuidv4 } from 'uuid'

import {
  AIHighlight,
  CharacterCount,
  CodeBlockLowlight,
  Color,
  CustomKeymap,
  GlobalDragHandle,
  Highlight,
  HorizontalRule,
  Markdown,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TextStyle,
  TiptapImage,
  TiptapLink,
  TiptapUnderline,
  Twitter,
  Youtube,
  Mathematics,
  TextAlign,
  Superscript,
  Subscript,
  AutoJoiner
} from '@/editor/extensions'
import { UploadImagesPlugin } from '@/editor/plugins'

//TODO I am using cx here to get tailwind autocomplete working, idk if someone else can write a regex to just capture the class key in objects
const aiHighlight = AIHighlight
//You can overwrite the placeholder with your own configuration
const placeholder = Placeholder
const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      'text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer dark:text-slate-400 dark:hover:text-slate-200'
    )
  }
})

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx('opacity-40 rounded-lg border border-slate-200')
      })
    ]
  },
  addAttributes() {
    const id = uuidv4()
    const alt = `img-alt-${id}`
    const title = `img-title-${id}`

    return {
      ...this.parent?.(),
      id: {
        default: id
      },
      alt: {
        default: alt
      },
      title: {
        default: title
      },
      width: {
        default: null
      },
      height: {
        default: null
      },
      onerror: {
        default: 'handleError(this)'
      }
    }
  }
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx('rounded-lg border border-muted')
  }
})

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx('not-prose pl-2')
  }
})
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx('flex gap-2 items-start my-4')
  },
  nested: true
})

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx('mt-4 mb-6 border-t border-muted-foreground')
  }
})

const starterKit = StarterKit.configure({
  heading: {
    levels: [1, 2, 3, 4],
    HTMLAttributes: {
      class: cx('dark:text-slate-200')
    }
  },
  bulletList: {
    HTMLAttributes: {
      class: cx('list-disc list-outside leading-3 -mt-2')
    }
  },
  orderedList: {
    HTMLAttributes: {
      class: cx('list-decimal list-outside leading-3 -mt-2')
    }
  },
  listItem: {
    HTMLAttributes: {
      class: cx('leading-normal -mb-2')
    }
  },
  blockquote: {
    HTMLAttributes: {
      class: cx('border-l-4 border-slate-200')
    }
  },
  codeBlock: false,
  code: {
    HTMLAttributes: {
      class: cx('rounded-md bg-muted px-1.5 py-1 font-mono font-medium before:content-none after:content-none'),
      spellcheck: 'false'
    }
  },
  paragraph: {
    HTMLAttributes: {
      class: cx('dark:text-slate-400')
    }
  },
  horizontalRule: false,
  dropcursor: {
    color: '#DBEAFE',
    width: 4
  },
  gapcursor: false
})

const codeBlockLowlight = CodeBlockLowlight.configure({
  // configure lowlight: common /  all / use highlightJS in case there is a need to specify certain language grammars only
  // common: covers 37 language grammars which should be good enough in most cases
  lowlight: createLowlight(common)
})

const youtube = Youtube.configure({
  HTMLAttributes: {
    class: cx('rounded-lg border border-muted')
  },
  inline: false
})

const twitter = Twitter.configure({
  HTMLAttributes: {
    class: cx('not-prose')
  },
  inline: false
})

const mathematics = Mathematics.configure({
  HTMLAttributes: {
    class: cx('text-slate-700 rounded p-1 hover:bg-accent cursor-pointer dark:text-slate-400')
  },
  katexOptions: {
    throwOnError: false
  }
})

const tiptapUnderline = TiptapUnderline
const color = Color
const textStyle = TextStyle
const textAlign = TextAlign
const superscript = Superscript
const subscript = Subscript
const highlight = Highlight
const markdown = Markdown
const globalDragHandle = GlobalDragHandle
const autoJoiner = AutoJoiner
const customKeymap = CustomKeymap

const characterCount = CharacterCount.configure()

export const defaultExtensions = [
  starterKit,
  placeholder,
  textAlign,
  superscript,
  subscript,
  tiptapLink,
  tiptapImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  codeBlockLowlight,
  youtube,
  twitter,
  mathematics,
  characterCount,
  tiptapUnderline,
  markdown,
  highlight,
  textStyle,
  color,
  customKeymap,
  globalDragHandle,
  autoJoiner
]
