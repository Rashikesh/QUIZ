'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';

export default function UserHistoryDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [history, setHistory] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Session Sentinal Guard Checkpoint
  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  // 2. Fetch live data records out of our MongoDB Atlas cluster on mount
  useEffect(() => {
    if (!user) return;

    const fetchLiveMetrics = async () => {
      try {
        const token = localStorage.getItem('qwizzy_token');
        const res = await fetch('http://localhost:5000/api/quiz/my-history', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to download server parameters.');

        setHistory(data);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setFetching(false);
      }
    };

    fetchLiveMetrics();
  }, [user]);

  if (loading || !user) return <div className="text-center p-5 fw-bold">Verifying credentials...</div>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow border-0 bg-body-tertiary text-body-secondary" style={{ borderRadius: '16px' }}>
        
        {/* Dashboard Header Element Navigation Controls */}
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
          <div>
            <h2 className="fw-black text-body-emphasis mb-1">Performance History</h2>
            <p className="text-muted small mb-0">Live stats tracking for account reference: <span className="font-monospace fw-bold">{user.name}</span></p>
          </div>
          <Link href="/categories" className="btn text-white fw-bold px-4" style={{ backgroundColor: '#534ad3', borderRadius: '50px' }}>
            Back to Arena
          </Link>
        </div>

        {/* Error Handling Alert Messages */}
        {errorMsg && <div className="alert alert-danger p-2 small fw-bold">{errorMsg}</div>}

        {/* Live Metrics Grid Execution Flow States */}
        {fetching ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted small fw-semibold">Downloading score logs from Atlas...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-5 border rounded bg-body">
            <h4 className="text-muted fw-bold mb-2">No Records Found</h4>
            <p className="text-muted small mb-3">You haven't completed any quizzes yet!</p>
            <Link href="/categories" className="btn btn-sm btn-outline-primary fw-bold">Take Your First Quiz</Link>
          </div>
        ) : (
          /* Live Database Metrics Table Map */
          <div className="table-responsive">
            <table className="table table-hover table-striped text-center align-middle m-0">
              <thead className="table-dark">
                <tr>
                  <th>Date Taken</th>
                  <th>Category Subject</th>
                  <th>Difficulty Level</th>
                  <th>Score Obtained</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row) => (
                  <tr key={row._id}>
                    <td className="text-muted small">
                      {new Date(row.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="fw-bold text-body-emphasis">{row.category}</td>
                    <td>
                      <span className={`badge text-uppercase px-3 py-2 ${
                        row.difficulty === 'easy' ? 'bg-success' : 
                        row.difficulty === 'medium' ? 'bg-warning text-dark' : 'bg-danger'
                      }`}>
                        {row.difficulty}
                      </span>
                    </td>
                    <td className="fw-black text-success fs-5">
                      {row.score} <span className="text-muted fs-6 font-normal">/ {row.totalQuestions * 10}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
