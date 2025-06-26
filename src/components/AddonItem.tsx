export default function AddonItem({
  title,
  price,
  active,
  onClick,
}: {
  title: string
  price?: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-4 flex justify-between items-center cursor-pointer ${
        active ? 'border-red-600 bg-red-50' : 'border-gray-200'
      }`}
    >
      <div>
        <div className="text-sm font-semibold text-gray-800">{title}</div>
        {price && <div className="text-sm text-red-600">{price}</div>}
      </div>
      <input type="checkbox" checked={active} readOnly className="w-5 h-5" />
    </div>
  )
}
