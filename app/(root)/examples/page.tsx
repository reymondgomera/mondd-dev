import { getExampleData } from '@/actions/examples'
import ExampleForm from './_components/example-form'

export default async function ExamplePage() {
  const referenceData = await getExampleData()
  const postypeData = referenceData ? referenceData.filter((ref) => ref.entityCode === 'post-type') : []

  return (
    <div className='mx-auto h-full w-full max-w-5xl'>
      <div className='mt-10'>
        <ExampleForm
          refData={referenceData ? referenceData.map((ref) => ({ value: ref.code, label: ref.name })) : []}
          postType={postypeData ? postypeData.map((ref) => ({ value: ref.code, label: ref.name })) : []}
        />
      </div>
    </div>
  )
}
