export default function BillCard() {
    return (
        <div className="bg-gray-50 rounded-xl mt-4 p-4 shadow-sm">
            <p className="text-xs text-gray-500">Prabayar 081234567890</p>
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-base text-gray-800">Tagihan Anda</h2>
                <div className="text-right">
                    <p className="text-red-600 font-bold text-lg">Rp12.000</p>
                    <a className="text-sm font-bold text-blue-600" href="#">Riwayat Transaksi</a>
                </div>
            </div>
            <p className="mt-2 text-sm flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                <span className="text-gray-500">Top up pulsa untuk melunasi tagihan.</span>
            </p>
        </div>
    )
}
