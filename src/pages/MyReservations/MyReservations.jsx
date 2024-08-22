import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getMyReservations } from "../../services/reservationsService";
import ReservationCarCard from "../../components/ReservationCarCard/ReservationCarCard";
import { useNavigate } from "react-router-dom";

const MyReservations = () => {
  const { user, loading } = useAuth();
  const [reservations, setReservations] = useState([]);

  const navigate = useNavigate();

  if (!loading && !user) {
    navigate("/");
  }

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/");
      }
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        const populateReservations = async () => {
          const response = await getMyReservations();
          setReservations(response.data);
        };

        populateReservations();
      } else {
        navigate("/");
      }
    }
  }, [user, navigate, loading]);

  if (loading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="flex justify-center">
      <div className="container px-6 my-12 min-h-[calc(100vh-281px-168px)]">
        <h1 className="text-left font-bold text-3xl mb-6">
          {user.username}&apos;s reservations
        </h1>
        {reservations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-center items-center">
            {reservations.map((reservation) => (
              <ReservationCarCard
                key={reservation._id}
                reservation={reservation}
              />
            ))}
          </div>
        ) : (
          <h2>You don&apos;t have any reservations yet</h2>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
