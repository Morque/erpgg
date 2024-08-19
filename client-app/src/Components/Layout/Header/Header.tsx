import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { urlApi } from '../../../Providers/API';
import { anonimous_icon } from '../../../Assets/images';
import MenuHeader from './MenuHeader';
import './Header.css';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  children?: any
  // Define las props aquí
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [model, setModel] = useState<Array<any>>();
  const [userName, setUserName] = useState<string>('');
  const [menuProfileOpen, setMenuProfileOpen] = useState<boolean>(false);
  const token = Cookies.get('SSID');
  const navigate = useNavigate();

  const menuProfileContainerRef = useRef<HTMLDivElement>(null);

  const fetchModel = async () => {
    if (token) {
      try {

      } catch (error) {

      }
    }
  }

  const OpenProfileMenu = () => {
    if (menuProfileOpen) {
      CloseProfileMenu();
    }
    else {
      setMenuProfileOpen(true);
    }
  }

  const CloseProfileMenu = () => {
    menuProfileContainerRef.current?.classList.remove('animate-fade-down');
    menuProfileContainerRef.current?.classList.remove('animate-duration-500');
    menuProfileContainerRef.current?.classList.remove('animate-ease-out');

    setTimeout(() => {
      menuProfileContainerRef.current?.classList.add('animate-fade-down');
      menuProfileContainerRef.current?.classList.add('animate-reverse');
      menuProfileContainerRef.current?.classList.add('animate-duration-300');
      menuProfileContainerRef.current?.classList.add('animate-ease-out');
    }, 100);

    setTimeout(() => {
      setMenuProfileOpen(false);
    }, 400);
  }

  const handleClickOutside = (event: MouseEvent): any => {
    if (menuProfileContainerRef.current && !menuProfileContainerRef.current.contains(event.target as Node)) {
      CloseProfileMenu();
    }
  };

  const logOutClick = () => {
    navigate('/login', { replace: true });
  }

  useEffect(() => {
    fetchModel();
    const first_name = Cookies.get('first_name') ?? '';
    setUserName(first_name);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  const menu = [
    {
      displayText: "Dashboard",
      children: [
        { displayText: "Visión general", children: "Visión general" },
        { displayText: "KPIs", children: "KPIs" },
        { displayText: "Reportes gráficos", children: "Reportes gráficos" },
        { displayText: "Notificaciones", children: "Notificaciones" }
      ]
    },
    {
      displayText: "Financiera",
      children: [
        { displayText: "Cuentas por pagar", children: "Cuentas por pagar" },
        { displayText: "Cuentas por cobrar", children: "Cuentas por cobrar" },
        { displayText: "Contabilidad general", children: "Contabilidad general" },
        { displayText: "Presupuestos", children: "Presupuestos" },
        { displayText: "Informes financieros", children: "Informes financieros" }
      ]
    },
    {
      displayText: "Inventario",
      children: [
        { displayText: "Control de stock", children: "Control de stock" },
        { displayText: "Gestión de almacenes", children: "Gestión de almacenes" },
        { displayText: "Órdenes de compra", children: "Órdenes de compra" },
        { displayText: "Niveles de inventario", children: "Niveles de inventario" },
        { displayText: "Auditoría de inventarios", children: "Auditoría de inventarios" }
      ]
    },
    {
      displayText: "Ventas",
      children: [
        { displayText: "Gestión de clientes", children: "Gestión de clientes" },
        { displayText: "Cotizaciones", children: "Cotizaciones" },
        { displayText: "Órdenes de venta", children: "Órdenes de venta" },
        { displayText: "Facturación", children: "Facturación" },
        { displayText: "Seguimiento de oportunidades", children: "Seguimiento de oportunidades" }
      ]
    },
    {
      displayText: "Compras",
      children: [
        { displayText: "Solicitudes de compra", children: "Solicitudes de compra" },
        { displayText: "Órdenes de compra", children: "Órdenes de compra" },
        { displayText: "Gestión de proveedores", children: "Gestión de proveedores" },
        { displayText: "Recepción de mercancías", children: "Recepción de mercancías" },
        { displayText: "Cuentas por pagar", children: "Cuentas por pagar" }
      ]
    },
    {
      displayText: "Recursos Humanos",
      children: [
        { displayText: "Gestión de empleados", children: "Gestión de empleados" },
        { displayText: "Nómina", children: "Nómina" },
        { displayText: "Asistencia y horarios", children: "Asistencia y horarios" },
        { displayText: "Beneficios y compensaciones", children: "Beneficios y compensaciones" },
        { displayText: "Evaluaciones de desempeño", children: "Evaluaciones de desempeño" }
      ]
    },
    {
      displayText: "Producción",
      children: [
        { displayText: "Planificación de la producción", children: "Planificación de la producción" },
        { displayText: "Gestión de órdenes de trabajo", children: "Gestión de órdenes de trabajo" },
        { displayText: "Control de calidad", children: "Control de calidad" },
        { displayText: "Mantenimiento de equipos", children: "Mantenimiento de equipos" },
        { displayText: "Gestión de recursos", children: "Gestión de recursos" }
      ]
    },
    {
      displayText: "Proyectos",
      children: [
        { displayText: "Planificación de proyectos", children: "Planificación de proyectos" },
        { displayText: "Gestión de tareas", children: "Gestión de tareas" },
        { displayText: "Presupuestos de proyectos", children: "Presupuestos de proyectos" },
        { displayText: "Asignación de recursos", children: "Asignación de recursos" },
        { displayText: "Seguimiento de hitos", children: "Seguimiento de hitos" }
      ]
    },
    {
      displayText: "Logística",
      children: [
        { displayText: "Gestión de envíos", children: "Gestión de envíos" },
        { displayText: "Planificación de rutas", children: "Planificación de rutas" },
        { displayText: "Seguimiento de entregas", children: "Seguimiento de entregas" },
        { displayText: "Devoluciones", children: "Devoluciones" },
        { displayText: "Gestión de transportistas", children: "Gestión de transportistas" }
      ]
    },
    {
      displayText: "Pedidos",
      children: [
        { displayText: "Atención al cliente", children: "Atención al cliente" },
        { displayText: "Historial de interacciones", children: "Historial de interacciones" },
        { displayText: "Gestión de tickets", children: "Gestión de tickets" },
        { displayText: "Encuestas de satisfacción", children: "Encuestas de satisfacción" },
        { displayText: "Análisis de clientes", children: "Análisis de clientes" }
      ]
    },
    {
      displayText: "Reportes",
      children: [
        { displayText: "Informes personalizados", children: "Informes personalizados" },
        { displayText: "BI y análisis de datos", children: "BI y análisis de datos" },
        { displayText: "Cuadros de mando", children: "Cuadros de mando" },
        { displayText: "Auditoría y trazabilidad", children: "Auditoría y trazabilidad" },
        { displayText: "Exportación de datos", children: "Exportación de datos" }
      ]
    },
    {
      displayText: "Seguridad",
      children: [
        { displayText: "Gestión de usuarios", children: "Gestión de usuarios" },
        { displayText: "Control de acceso", children: "Control de acceso" },
        { displayText: "Auditoría de seguridad", children: "Auditoría de seguridad" },
        { displayText: "Roles y permisos", children: "Roles y permisos" },
        { displayText: "Copias de seguridad", children: "Copias de seguridad" }
      ]
    },
    {
      displayText: "Integración",
      children: [
        { displayText: "Conexiones con otros sistemas", children: "Conexiones con otros sistemas" },
        { displayText: "Configuración de API", children: "Configuración de API" },
        { displayText: "Sincronización de datos", children: "Sincronización de datos" },
        { displayText: "Webhooks", children: "Webhooks" },
        { displayText: "Monitorización de integraciones", children: "Monitorización de integraciones" }
      ]
    },
    {
      displayText: "Gestión Documental",
      children: [
        { displayText: "Almacenamiento de documentos", children: "Almacenamiento de documentos" },
        { displayText: "Control de versiones", children: "Control de versiones" },
        { displayText: "Acceso a documentos", children: "Acceso a documentos" },
        { displayText: "Digitalización de archivos", children: "Digitalización de archivos" },
        { displayText: "Flujos de aprobación", children: "Flujos de aprobación" }
      ]
    },
    {
      displayText: "Mantenimiento",
      children: [
        { displayText: "Solicitudes de mantenimiento", children: "Solicitudes de mantenimiento" },
        { displayText: "Programación de servicios", children: "Programación de servicios" },
        { displayText: "Gestión de activos", children: "Gestión de activos" },
        { displayText: "Inventario de repuestos", children: "Inventario de repuestos" },
        { displayText: "Seguimiento de contratos de servicio", children: "Seguimiento de contratos de servicio" }
      ]
    },
    {
      displayText: "Compliance y Normativas",
      children: [
        { displayText: "Gestión de riesgos", children: "Gestión de riesgos" },
        { displayText: "Cumplimiento de normativas", children: "Cumplimiento de normativas" },
        { displayText: "Auditorías internas", children: "Auditorías internas" },
        { displayText: "Certificaciones", children: "Certificaciones" },
        { displayText: "Documentación legal", children: "Documentación legal" }
      ]
    }]

  return (
    <div className='w-screen h-16 bg-sky-900 border-gray-300 grid grid-cols-2 md:grid-cols-6 shadow-md shadow-gray-200' >
      <a href='/' className='mx-12 my-auto text-xl text-white font-semibold'>TutoSite</a>
      <div className='max-md:hidden grid-cols-subgrid col-span-4 my-auto'>
        <MenuHeader listMenus={menu} />
      </div>
      <div className='text-center my-auto'>
        <div className='flex flex-row justify-center items-center' onClick={OpenProfileMenu}>
          <span><a className='text-white inline-block font-serif cursor-pointer text-center'>Hola, {userName}</a></span>
          <span 
            className="material-icon material-symbols-outlined text-white text-md px-2 cursor-pointer text-center" >
            account_circle
          </span>
          {/* <img className='inline-block w-7 ml-3 cursor-pointer' src={anonimous_icon} /> */}
        </div>
        {
          menuProfileOpen && (
            <div
              ref={menuProfileContainerRef}
              className='animate-fade-down animate-duration-500 animate-ease-out absolute right-4 xl:right-24 w-1/2 sm md:w-1/6 xl:w-1/12 '>
              <div className='banderin mx-auto'></div>
              <div className='rounded-md shadow-xl bg-white py-2 flex flex-col items-center gap-2'>
                <button className=''>Mi perfil</button>
                <button className='' onClick={logOutClick}>Cerrar sesion</button>
              </div>
            </div>
          )
        }
      </div>
    </div >
  );
}

export default Header;
