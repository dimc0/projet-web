import { useState, useEffect } from "react";
import "./assets/Rdv.css";
import { AjouterRdv } from "./AjouterRdv";

export function Rdv({ contacts = [] }) {
  const [rdv, setRdv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRdv, setSelectedRdv] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchRdv = async () => {
    try {
      const res = await fetch("http://localhost:8888/crm/php/rdv.php");
      const data = await res.json();
      setRdv(data);
    } catch (err) {
      console.error("Erreur fetch RDV :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRdv();
  }, []);

  const handleAddRdv = async (newRdv) => {
    try {
      const res = await fetch("http://localhost:8888/crm/php/rdv.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRdv),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Erreur ajout RDV");
      await fetchRdv();
      setShowAddForm(false);
      setSelectedRdv(null);
    } catch (err) {
      console.error("Erreur ajout RDV :", err);
      throw err;
    }
  };

  const handleUpdateRdv = async (updatedRdv) => {
    try {
      const res = await fetch("http://localhost:8888/crm/php/rdv.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRdv),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Erreur mise à jour RDV");
      await fetchRdv();
      setShowAddForm(false);
      setSelectedRdv(null);
    } catch (err) {
      console.error("Erreur mise à jour RDV :", err);
      throw err;
    }
  };

  const handleDeleteRdv = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      return;
    }
    try {
      const res = await fetch("http://localhost:8888/crm/php/rdv.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Erreur suppression RDV");
      await fetchRdv();
    } catch (err) {
      console.error("Erreur suppression RDV :", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRdvByDate = (date) => {
    return rdv.filter((r) => {
      const rdvDate = new Date(r.schedule);
      return (
        rdvDate.getDate() === date.getDate() &&
        rdvDate.getMonth() === date.getMonth() &&
        rdvDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Jours du mois précédent
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, daysInPrevMonth - i));
    }
    
    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  if (showAddForm) {
    return (
      <AjouterRdv
        contacts={contacts}
        rdv={selectedRdv}
        onSave={selectedRdv ? handleUpdateRdv : handleAddRdv}
        onCancel={() => {
          setShowAddForm(false);
          setSelectedRdv(null);
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="rdv-container">
        <div className="rdv-loading">Chargement...</div>
      </div>
    );
  }

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  return (
    <div className="rdv-container">
      <div className="rdv-header">
        <h1 className="rdv-title">Calendrier des rendez-vous</h1>
        <button className="btn-primary" onClick={() => setShowAddForm(true)}>
          + Nouveau rendez-vous
        </button>
      </div>

      <div className="rdv-content">
        <div className="calendar-wrapper">
          <div className="calendar-header">
            <button
              className="calendar-nav-btn"
              onClick={() => navigateMonth(-1)}
            >
              ←
            </button>
            <h2 className="calendar-month">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              className="calendar-nav-btn"
              onClick={() => navigateMonth(1)}
            >
              →
            </button>
          </div>

          <div className="calendar-grid">
            {weekDays.map((day) => (
              <div key={day} className="calendar-weekday">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentDate).map((date, index) => {
              const dayRdv = getRdvByDate(date);
              const isCurrentMonthDay = isCurrentMonth(date);
              const isTodayDate = isToday(date);

              return (
                <div
                  key={index}
                  className={`calendar-day ${
                    !isCurrentMonthDay ? "calendar-day-other" : ""
                  } ${isTodayDate ? "calendar-day-today" : ""} ${
                    dayRdv.length > 0 ? "calendar-day-has-rdv" : ""
                  }`}
                >
                  <span className="calendar-day-number">{date.getDate()}</span>
                  {dayRdv.length > 0 && (
                    <div className="calendar-day-rdv-count">
                      {dayRdv.length} RDV
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rdv-list-wrapper">
          <h2 className="rdv-list-title">Rendez-vous à venir</h2>
          {rdv.length === 0 ? (
            <div className="rdv-empty">
              <p>Aucun rendez-vous programmé</p>
            </div>
          ) : (
            <div className="rdv-list">
              {rdv
                .filter((r) => new Date(r.schedule) >= new Date())
                .sort((a, b) => new Date(a.schedule) - new Date(b.schedule))
                .map((r) => (
                  <div key={r.id} className="rdv-card">
                    <div className="rdv-card-header">
                      <div className="rdv-card-date">
                        <div className="rdv-card-day">
                          {new Date(r.schedule).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                          })}
                        </div>
                        <div className="rdv-card-time">{formatTime(r.schedule)}</div>
                      </div>
                      <div className="rdv-card-actions">
                        <button
                          className="btn-icon btn-edit"
                          onClick={() => {
                            setSelectedRdv(r);
                            setShowAddForm(true);
                          }}
                          title="Modifier"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => handleDeleteRdv(r.id)}
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <div className="rdv-card-body">
                      <div className="rdv-card-contact">
                        <strong>{r.contact_name || "Contact inconnu"}</strong>
                      </div>
                      <div className="rdv-card-details">
                        <span className="rdv-card-place">📍 {r.place}</span>
                        {r.contact_email && (
                          <span className="rdv-card-email">
                            📧 {r.contact_email}
                          </span>
                        )}
                        {r.contact_phone && (
                          <span className="rdv-card-phone">
                            📞 {r.contact_phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
