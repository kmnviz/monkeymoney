export default function Header({ title }: { title: string }) {
  return (
    <header className="chat-dialog-header-wrapper bg-blue-600 text-white py-4">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
    </header>
  )
}
