import { siteConfig } from '@/constant'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const font = await fetch(new URL('../../../public/fonts/DMSans_ExtraBold.woff', import.meta.url)).then((res) => res.arrayBuffer())
    const placeholderImg = 'https://utfs.io/f/fTns6YWpn6vPZRUxJxK106YHk7GwAOXTjWzKFd23S5eoVuJh'

    const title = searchParams.get('title') ?? siteConfig.name
    const imgUrl = searchParams.get('imgUrl') ?? undefined

    return new ImageResponse(
      (
        <div style={{ position: 'relative', textAlign: 'center', width: '100%', height: '100%', display: 'flex' }}>
          <img
            src={imgUrl ?? (placeholderImg as any)}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.5);' }}
          />
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              fontFamily: 'DMSans',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 48,
              padding: '0 64px',
              color: '#FFFFFF',
              width: '95%'
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        fonts: [{ name: 'DMSans', data: font, style: 'normal' }]
      }
    )
  } catch (err: any) {
    return new Response('Failed to generated OG image', { status: 500 })
  }
}
