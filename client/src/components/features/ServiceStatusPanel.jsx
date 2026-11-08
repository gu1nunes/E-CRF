import React, { useEffect, useState } from 'react';
import { getServicesStatus } from '../../services/api';

const ServiceStatusPanel = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServicesStatus()
      .then((response) => {
        setServices(response.data.services || []);
      })
      .catch((error) => {
        console.error('Erro ao buscar status:', error);
        setServices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="services-status-panel">
      <h3>Status dos Microservicos</h3>
      {loading ? (
        <p>Carregando status...</p>
      ) : (
        <ul className="services-status-list">
          {services.map((service) => (
            <li key={service.name} className="services-status-item">
              <span className="service-name">{service.name}</span>
              <span className={`service-state ${service.status === 'ok' ? 'ok' : 'down'}`}>
                {service.status}
              </span>
              <span className="service-meta">porta {service.port}</span>
              <span className="service-meta">uptime {Math.floor((service.uptime || 0) / 1000)}s</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ServiceStatusPanel;
