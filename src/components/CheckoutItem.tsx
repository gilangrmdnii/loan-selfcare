export default function CheckoutItem({
  title,
  price,
  image,
}: {
  title: string
  price: string
  image: string
}) {
  return (
    <div className="flex items-center gap-4">
      <img src={image} className="w-12 h-12 object-cover rounded" />
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-800">{title}</div>
        <div className="text-xs text-gray-500">Kuantitas: 1</div>
      </div>
      <div className="text-sm font-bold text-gray-800">{price}</div>
    </div>
  )
}
