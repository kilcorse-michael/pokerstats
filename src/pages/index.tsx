import DropDown from '../components/Dropdown'
import { Inter } from 'next/font/google'
import useSwr from 'swr'
import { Player, Data } from "./interfaces"
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { data, error, isLoading } = useSwr<Data[]>('/api/hello', fetcher)

  if (error) return <div>Failed to load users</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  console.log(data)

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <DropDown props={data.body}/>
    </main>
  )
}
