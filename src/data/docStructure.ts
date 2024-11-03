import { DocItem } from '../types/docs';

export const docStructure: DocItem[] = [
  {
    id: 'legal-docs',
    title: 'Legal docs',
    type: 'folder',
    children: [
      { 
        id: 'terms',
        title: 'Escritura de Propiedad',
        type: 'file',
        fileType: 'pdf',
        url: '/docs/legal/terms.pdf'
      },
      { 
        id: 'registro',
        title: 'Registro de la propiedad',
        type: 'file',
        fileType: 'pdf',
        url: '/docs/legal/privacy.pdf'
      }
    ]
  },
  {
    id: 'planos',
    title: 'Planos',
    type: 'folder',
    children: [
      { 
        id: 'plano-general',
        title: 'Plano General',
        type: 'file',
        fileType: 'pdf',
        url: '/docs/planos/general.pdf'
      },
      { 
        id: 'plano-instalaciones',
        title: 'Instalaciones',
        type: 'file',
        fileType: 'pdf',
        url: '/docs/planos/instalaciones.pdf'
      },
      { 
        id: 'plano-alzados',
        title: 'Alzados',
        type: 'file',
        fileType: 'pdf',
        url: '/docs/planos/alzados.pdf'
      }
    ]
  },
  {
    id: 'fotos',
    title: 'Fotos',
    type: 'folder',
    children: [
      { 
        id: 'fotos-exterior',
        title: 'Exterior',
        type: 'file',
        fileType: 'pdf',
        url: '/docs/fotos/exterior.pdf'
      },
      { 
        id: 'fotos-interior',
        title: 'Interior',
        type: 'file',
        fileType: 'pdf',
        url: '/docs/fotos/interior.pdf'
      },
      { 
        id: 'fotos-reformas',
        title: 'Reformas',
        type: 'file',
        fileType: 'pdf',
        url: '/docs/fotos/reformas.pdf'
      }
    ]
  },
  {
    id: 'contratos',
    title: 'Contratos',
    type: 'folder',
    children: [
      { 
        id: 'contrato-alquiler',
        title: 'Contrato de Alquiler',
        type: 'file',
        fileType: 'pdf',
        url: '/docs/contratos/alquiler.pdf'
      },
      { 
        id: 'contrato-servicios',
        title: 'Contratos de Servicios',
        type: 'file',
        fileType: 'pdf',
        url: '/docs/contratos/servicios.pdf'
      },
      { 
        id: 'contrato-mantenimiento',
        title: 'Contrato de Mantenimiento',
        type: 'file',
        fileType: 'pdf',
        url: '/docs/contratos/mantenimiento.pdf'
      },
      { 
        id: 'contrato-seguro',
        title: 'Póliza de Seguro',
        type: 'file',
        fileType: 'pdf',
        url: '/docs/contratos/seguro.pdf'
      }
    ]
  }
];