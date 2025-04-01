const Portfolio = () => {
  return (
    <div className="card bg-base-100 shadow-xl col-span-4 md:col-span-2 mx-12 md:ml-12 md:mr-4 mt-12 border border-gray-300">
    <div className="card-body">
      <div className="card-title">Current Portfolio</div>
      <hr></hr>
      <div className="overflow-y-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Item</th>
              <th>Position</th>
              <th>Avg Price</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default Portfolio