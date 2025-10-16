import Link from "next/link";

export default function selectRolePage() {
  return (
    <main className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Welcome</h1>
        <p className="lead">Please select your role to proceed.</p>
      </div>

      <div className="row justify-content-center g-4">
        {/* Manager Role Card */}
        <div className="col-md-5 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center d-flex flex-column">
              <h5 className="card-title h2">Officer</h5>
              <p className="card-text text-muted">
                Access the operative dashboard to manage operations.
              </p>
              <div className="mt-auto">
                <Link href="/manager" className="btn btn-primary w-100">
                  Select Manager
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Role Card */}
        <div className="col-md-5 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center d-flex flex-column">
              <h5 className="card-title h2">Customer</h5>
              <p className="card-text text-muted">
                Browse products, manage your account and orders, and view your
                purchase history.
              </p>
              <div className="mt-auto">
                <Link
                  href="/customer/get-ticket"
                  className="btn btn-success w-100"
                >
                  Select Customer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
