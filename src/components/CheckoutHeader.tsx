export default function CheckoutHeader() {
  return (
    <div className="border-b border-gray-200 py-4 px-4 md:px-8 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/assets/logo/Logo-TShop.png" className="h-6" alt="TShop Logo" />
        <span className="text-xs bg-red-500 text-white px-2 py-[2px] rounded-2xl">CHECKOUT</span>
      </div>
      <div className="flex gap-2 items-center text-sm">
        <img src="/assets/logo/ID.png" className="w-4 h-4" />
        <img src="/assets/logo/USA.png" className="w-4 h-4" />
      </div>
    </div>
  )
}
