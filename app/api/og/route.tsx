import { ImageResponse } from '@vercel/og'

import { siteConfig } from '@/constant'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

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
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 48,
              fontWeight: 'bold',
              padding: '0 64px',
              color: '#FFFFFF',
              width: '95%'
            }}
          >
            {title}
          </div>
        </div>
      )
    )
  } catch (err: any) {
    return new Response('Failed to generated OG image', { status: 500 })
  }
}
