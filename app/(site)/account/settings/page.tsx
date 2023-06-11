

export default function page() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="min-h-[400px] rounded-xl shadow"></div>
        <div className="min-h-[400px] grid grid-flow-row gap-3">
          <div className="min-h-[200px] shadow rounded-xl "></div>
          <div className="min-h-[120px] shadow rounded-xl "></div>
          <div className="min-h-[120px] shadow rounded-xl "></div>
        </div>
      </div>
    </div>
  )
}
