import { createSuggestionItems } from '@/editor/extensions'
import { Command, renderItems } from '@/editor/extensions'
import { EditorIcons } from '../icons'
import { uploadFn } from './image-upload/editor-image-upload'

export const getSuggestionItems = (limit: number) => {
  return createSuggestionItems([
    {
      title: 'Text',
      description: 'Plain text.',
      searchTerms: ['p', 'paragraph', 'text'],
      icon: <EditorIcons.text size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').run()
      }
    },
    {
      title: 'Heading 1',
      description: 'Largest section heading.',
      searchTerms: ['title', 'largest', 'h1', 'heading1'],
      icon: <EditorIcons.h1 size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
      }
    },
    {
      title: 'Heading 2',
      description: 'Large section heading.',
      searchTerms: ['subtitle', 'large', 'h2', 'heading2'],
      icon: <EditorIcons.h2 size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
      }
    },
    {
      title: 'Heading 3',
      description: 'Medium section heading.',
      searchTerms: ['section', 'Medium', 'h3', 'heading3'],
      icon: <EditorIcons.h3 size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
      }
    },
    {
      title: 'Heading 4',
      description: 'Small section heading.',
      searchTerms: ['subsection', 'small', 'h4', 'heading4'],
      icon: <EditorIcons.h4 size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 4 }).run()
      }
    },
    {
      title: 'To-do List',
      description: 'Track tasks with a to-do list.',
      searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
      icon: <EditorIcons.todo size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run()
      }
    },
    {
      title: 'Bullet List',
      description: 'Create a simple bullet list.',
      searchTerms: ['unordered', 'point'],
      icon: <EditorIcons.list size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run()
      }
    },
    {
      title: 'Numbered List',
      description: 'Create a list with numbering.',
      searchTerms: ['ordered', 'numbered'],
      icon: <EditorIcons.listOrdered size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      }
    },
    {
      title: 'Quote',
      description: 'Capture a quote.',
      searchTerms: ['blockquote', 'quote'],
      icon: <EditorIcons.quote size={18} />,
      command: ({ editor, range }) =>
        editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').toggleBlockquote().run()
    },
    {
      title: 'Code',
      description: 'Capture a code snippet.',
      searchTerms: ['codeblock', 'code'],
      icon: <EditorIcons.code size={18} />,
      command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
    },
    {
      title: 'Image',
      description: 'Upload an image from your computer.',
      searchTerms: ['photo', 'picture', 'media', 'img', 'image'],
      icon: <EditorIcons.image size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run()

        // upload image
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = async () => {
          if (input.files?.length) {
            const file = input.files[0]
            const pos = editor.view.state.selection.from
            const upload = uploadFn(limit)

            upload(file, editor.view, pos + 1)
          }
        }
        input.click()
      }
    },
    {
      title: 'Youtube',
      description: 'Embed a Youtube video.',
      searchTerms: ['video', 'youtube', 'embed'],
      icon: <EditorIcons.youtube size={18} />,
      command: ({ editor, range }) => {
        const videoLink = prompt('Please enter Youtube Video Link') ?? ''
        //From https://regexr.com/3dj5t
        const ytregex = new RegExp(
          /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
        )

        if (ytregex.test(videoLink)) {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setYoutubeVideo({
              src: videoLink
            })
            .run()
        } else {
          if (videoLink !== null) {
            alert('Please enter a correct Youtube Video Link')
          }
        }
      }
    }
    // {
    //   title: 'Twitter',
    //   description: 'Embed a Tweet.',
    //   searchTerms: ['twitter', 'embed'],
    //   icon: <EditorIcons.twitter size={18} />,
    //   command: ({ editor, range }) => {
    //     const tweetLink = prompt('Please enter Twitter Link') ?? ''
    //     const tweetRegex = new RegExp(/^https?:\/\/(www\.)?x\.com\/([a-zA-Z0-9_]{1,15})(\/status\/(\d+))?(\/\S*)?$/)

    //     if (tweetRegex.test(tweetLink)) {
    //       editor
    //         .chain()
    //         .focus()
    //         .deleteRange(range)
    //         .setTweet({
    //           src: tweetLink
    //         })
    //         .run()
    //     } else {
    //       if (tweetLink !== null) {
    //         alert('Please enter a correct Twitter Link')
    //       }
    //     }
    //   }
    // }
  ])
}

export const getSlashCommand = (limit: number) => {
  return Command.configure({
    suggestion: {
      items: () => getSuggestionItems(limit),
      render: renderItems
    }
  })
}
