import Pagination from "./Pagination"

const PaginationWrapper = ({ pagination, handlePageChange, blogLoading }: any) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6 w-full pt-6">
      <div className='w-full lg:w-auto flex justify-center lg:justify-start'>
        {pagination && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl px-6 py-4 border border-blue-100 shadow-sm w-full lg:max-w-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-6 sm:space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{pagination.totalItems}</div>
                  <div className="text-sm text-gray-600 mt-1">Total Blogs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{pagination.currentPage}</div>
                  <div className="text-sm text-gray-600 mt-1">Current Page</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{pagination.totalPages}</div>
                  <div className="text-sm text-gray-600 mt-1">Total Pages</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full lg:w-auto flex justify-center lg:justify-end">
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            showInfo={true}
            disabled={blogLoading}
          />
        )}
      </div>
    </div>

  )
}

export default PaginationWrapper