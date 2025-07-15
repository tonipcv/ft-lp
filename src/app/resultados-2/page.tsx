'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  PieChart,
  Search,
  Calendar,
  TrendingUp,
  Filter,
  LineChart,
  X,
  ChevronRight,
  Globe
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Interface para o tipo Trade
interface Trade {
  id: number;
  idu: string;
  data: string;
  ativo: string;
  direcao: string;
  percentual: number;
  alvo: number | string;
  createdAt?: string;
}

interface APIResponse {
  data: Trade[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Endpoints da API em ordem de prioridade
const API_ENDPOINTS = [
  'https://relatorio-ft-of.vercel.app/api/trades',
];

// Função para formatar a data de maneira consistente
const formatDate = (dateString: string) => {
  try {
    const d = new Date(dateString);
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const year = d.getUTCFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('[Reports] Erro ao formatar data:', dateString, error);
    return dateString;
  }
};

// Função para extrair o mês de uma string de data
const getMonthFromDateString = (dateStr: string) => {
  try {
    return new Date(dateStr).getMonth() + 1;
  } catch (error) {
    console.error('[Reports] Erro ao extrair mês da data:', dateStr, error);
    if (dateStr.includes('/')) {
      const [, month] = dateStr.split('/').map(Number);
      return month;
    }
    return 0;
  }
};

// Função para extrair dados da API
const extrairDadosDaAPI = (responseData: APIResponse): Trade[] => {
  if (!responseData?.data?.length) {
    console.log('[Reports] Nenhum dado encontrado na resposta da API');
    return [];
  }

  return responseData.data.map(trade => ({
    ...trade,
    data: formatDate(trade.data),
    direcao: trade.direcao?.toUpperCase() || trade.direcao,
    percentual: Number(trade.percentual)
  }));
};

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDirection, setSelectedDirection] = useState<'ALL' | 'LONG' | 'SHORT'>('ALL');
  const [selectedMonth, setSelectedMonth] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorState, setErrorState] = useState<{hasError: boolean; message: string}>({
    hasError: false,
    message: ''
  });
  const [pagination, setPagination] = useState<APIResponse['meta'] | null>(null);

  // Array com os meses disponíveis
  const availableMonths = [
    { number: 1, name: 'Janeiro' },
    { number: 2, name: 'Fevereiro' },
    { number: 3, name: 'Março' },
    { number: 4, name: 'Abril' },
    { number: 5, name: 'Maio' },
    { number: 6, name: 'Junho' }
  ];

  // Função para carregar dados de amostra
  const carregarDadosAmostra = () => {
    console.log("[Reports] Carregando dados de amostra para o mês", selectedMonth);
    
    const dadosAmostra = [
      {
        id: 1601,
        idu: "1601",
        data: "30/06/2025",
        ativo: "1000000BOB/USDT",
        direcao: "LONG",
        percentual: 20,
        alvo: 2
      },
        {
          id: 1600,
          idu: "1600",
          data: "30/06/2025",
          ativo: "HMSTR/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1599,
          idu: "1599",
          data: "30/06/2025",
          ativo: "1000000BOB/USDT",
          direcao: "SHORT",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1598,
          idu: "1598",
          data: "30/06/2025",
          ativo: "WAXP/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1597,
          idu: "1597",
          data: "30/06/2025",
          ativo: "BEL/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1596,
          idu: "1596",
          data: "30/06/2025",
          ativo: "SKATE/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1595,
          idu: "1595",
          data: "30/06/2025",
          ativo: "HFT/USDT",
          direcao: "LONG",
          percentual: 120,
          alvo: 7
        },
        {
          id: 1594,
          idu: "1594",
          data: "30/06/2025",
          ativo: "LEVER/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1593,
          idu: "1593",
          data: "30/06/2025",
          ativo: "H/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1592,
          idu: "1592",
          data: "30/06/2025",
          ativo: "PENGU/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1591,
          idu: "1591",
          data: "29/06/2025",
          ativo: "LPT/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1590,
          idu: "1590",
          data: "29/06/2025",
          ativo: "BMT/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1589,
          idu: "1589",
          data: "29/06/2025",
          ativo: "CRV/USDT",
          direcao: "LONG",
          percentual: 120,
          alvo: 7
        },
        {
          id: 1588,
          idu: "1588",
          data: "29/06/2025",
          ativo: "NMR/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1587,
          idu: "1587",
          data: "29/06/2025",
          ativo: "CTK/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1586,
          idu: "1586",
          data: "29/06/2025",
          ativo: "RVN/USDT",
          direcao: "SHORT",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1585,
          idu: "1585",
          data: "29/06/2025",
          ativo: "HOT/USDT",
          direcao: "LONG",
          percentual: 83,
          alvo: 5
        },
        {
          id: 1584,
          idu: "1584",
          data: "28/06/2025",
          ativo: "LEVER/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1583,
          idu: "1583",
          data: "28/06/2025",
          ativo: "NEWT/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1582,
          idu: "1582",
          data: "28/06/2025",
          ativo: "RAYSOL/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1581,
          idu: "1581",
          data: "28/06/2025",
          ativo: "TAIKO/SDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1580,
          idu: "1580",
          data: "28/06/2025",
          ativo: "MAGIC/USDT",
          direcao: "LONG",
          percentual: 180,
          alvo: 10
        },
        {
          id: 1579,
          idu: "1579",
          data: "28/06/2025",
          ativo: "CHESS/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1578,
          idu: "1578",
          data: "28/06/2025",
          ativo: "GPS/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1577,
          idu: "1577",
          data: "28/06/2025",
          ativo: "BROCCOLIF3B/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1576,
          idu: "1576",
          data: "28/06/2025",
          ativo: "FLM/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1575,
          idu: "1575",
          data: "27/06/2025",
          ativo: "SWARMS/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1574,
          idu: "1574",
          data: "27/06/2025",
          ativo: "NKN/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1573,
          idu: "1573",
          data: "27/06/2025",
          ativo: "RARE/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1572,
          idu: "1572",
          data: "27/06/2025",
          ativo: "SAHARA/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1571,
          idu: "1571",
          data: "27/06/2025",
          ativo: "SAND/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1570,
          idu: "1570",
          data: "27/06/2025",
          ativo: "MILK/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1569,
          idu: "1569",
          data: "27/06/2025",
          ativo: "FARTCOIN/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1568,
          idu: "1568",
          data: "27/06/2025",
          ativo: "XCN/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1567,
          idu: "1567",
          data: "27/06/2025",
          ativo: "AWE/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1566,
          idu: "1566",
          data: "27/06/2025",
          ativo: "H/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1565,
          idu: "1565",
          data: "27/06/2025",
          ativo: "XRP/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1564,
          idu: "1564",
          data: "26/06/2025",
          ativo: "BAND/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1563,
          idu: "1563",
          data: "26/06/2025",
          ativo: "MEME/USDT",
          direcao: "LONG",
          percentual: 61,
          alvo: 4
        },
        {
          id: 1562,
          idu: "1562",
          data: "26/06/2025",
          ativo: "ORDI/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1561,
          idu: "1561",
          data: "26/06/2025",
          ativo: "WOO/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1560,
          idu: "1560",
          data: "26/06/2025",
          ativo: "W/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1559,
          idu: "1559",
          data: "26/06/2025",
          ativo: "MYX/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1558,
          idu: "1558",
          data: "26/06/2025",
          ativo: "PEOPLE/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1557,
          idu: "1557",
          data: "26/06/2025",
          ativo: "HUMA/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1556,
          idu: "1556",
          data: "26/06/2025",
          ativo: "H/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1555,
          idu: "1555",
          data: "26/06/2025",
          ativo: "DMC/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1554,
          idu: "1554",
          data: "26/06/2025",
          ativo: "OL/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1553,
          idu: "1553",
          data: "26/06/2025",
          ativo: "BSW/USDT",
          direcao: "SHORT",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1552,
          idu: "1552",
          data: "26/06/2025",
          ativo: "BSW/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1551,
          idu: "1551",
          data: "25/06/2025",
          ativo: "BTC/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1550,
          idu: "1550",
          data: "25/06/2025",
          ativo: "FIL/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1549,
          idu: "1549",
          data: "25/06/2025",
          ativo: "BR/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1548,
          idu: "1548",
          data: "25/06/2025",
          ativo: "CGPT/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1547,
          idu: "1547",
          data: "25/06/2025",
          ativo: "1000000BOB/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1546,
          idu: "1546",
          data: "25/06/2025",
          ativo: "RESOLV/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1545,
          idu: "1545",
          data: "25/06/2025",
          ativo: "HU/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1544,
          idu: "1544",
          data: "25/06/2025",
          ativo: "LA/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1543,
          idu: "1543",
          data: "25/06/2025",
          ativo: "BROCCOLI714/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1542,
          idu: "1542",
          data: "24/06/2025",
          ativo: "BANANAS31/USDT",
          direcao: "SHORT",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1541,
          idu: "1541",
          data: "24/06/2025",
          ativo: "BDXN/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1540,
          idu: "1540",
          data: "24/06/2025",
          ativo: "STX/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1539,
          idu: "1539",
          data: "24/06/2025",
          ativo: "CETUS/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1538,
          idu: "1538",
          data: "24/06/2025",
          ativo: "WIF/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1537,
          idu: "1537",
          data: "23/06/2025",
          ativo: "SYRUP/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1536,
          idu: "1536",
          data: "23/06/2025",
          ativo: "HFT/USDT",
          direcao: "SHORT",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1535,
          idu: "1535",
          data: "23/06/2025",
          ativo: "VIRTUAL/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1534,
          idu: "1534",
          data: "23/06/2025",
          ativo: "INJ/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1533,
          idu: "1533",
          data: "23/06/2025",
          ativo: "CRV/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1532,
          idu: "1532",
          data: "23/06/2025",
          ativo: "LA/USDT",
          direcao: "LONG",
          percentual: 140,
          alvo: 8
        },
        {
          id: 1531,
          idu: "1531",
          data: "23/06/2025",
          ativo: "MILK/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1530,
          idu: "1530",
          data: "23/06/2025",
          ativo: "IP/USDT",
          direcao: "LONG",
          percentual: 180,
          alvo: 10
        },
        {
          id: 1529,
          idu: "1529",
          data: "23/06/2025",
          ativo: "BID/SDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1528,
          idu: "1528",
          data: "22/06/2025",
          ativo: "VET/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1527,
          idu: "1527",
          data: "22/06/2025",
          ativo: "THETA/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1526,
          idu: "1526",
          data: "22/06/2025",
          ativo: "SIGN/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1525,
          idu: "1525",
          data: "22/06/2025",
          ativo: "MYX/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1524,
          idu: "1524",
          data: "22/06/2025",
          ativo: "JASMY/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1523,
          idu: "1523",
          data: "22/06/2025",
          ativo: "ONT/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1522,
          idu: "1522",
          data: "21/06/2025",
          ativo: "DASH/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1521,
          idu: "1521",
          data: "21/06/2025",
          ativo: "SXP/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1520,
          idu: "1520",
          data: "21/06/2025",
          ativo: "RESOLV/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1519,
          idu: "1519",
          data: "21/06/2025",
          ativo: "POL/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1518,
          idu: "1518",
          data: "21/06/2025",
          ativo: "MTL/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1517,
          idu: "1517",
          data: "21/06/2025",
          ativo: "NEWT/USDT",
          direcao: "LONG",
          percentual: 77,
          alvo: 5
        },
        {
          id: 1516,
          idu: "1516",
          data: "21/06/2025",
          ativo: "HIFI/USDT",
          direcao: "LONG",
          percentual: 75,
          alvo: 5
        },
        {
          id: 1515,
          idu: "1515",
          data: "21/06/2025",
          ativo: "FARTCOIN/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1514,
          idu: "1514",
          data: "21/06/2025",
          ativo: "BAT/USDT",
          direcao: "SHORT",
          percentual: 75,
          alvo: 5
        },
        {
          id: 1513,
          idu: "1513",
          data: "21/06/2025",
          ativo: "ZKJ/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1512,
          idu: "1512",
          data: "21/06/2025",
          ativo: "1000WHY/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1511,
          idu: "1511",
          data: "21/06/2025",
          ativo: "BID/SDT",
          direcao: "LONG",
          percentual: 180,
          alvo: 10
        },
        {
          id: 1510,
          idu: "1510",
          data: "20/06/2025",
          ativo: "RSR/USDT",
          direcao: "SHORT",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1509,
          idu: "1509",
          data: "20/06/2025",
          ativo: "FUN/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1508,
          idu: "1508",
          data: "20/06/2025",
          ativo: "FLM/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1507,
          idu: "1507",
          data: "20/06/2025",
          ativo: "GPS/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1506,
          idu: "1506",
          data: "20/06/2025",
          ativo: "GPS/USDT",
          direcao: "SHORT",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1505,
          idu: "1505",
          data: "20/06/2025",
          ativo: "CYBER/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1504,
          idu: "1504",
          data: "20/06/2025",
          ativo: "LQTY/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1503,
          idu: "1503",
          data: "19/06/2025",
          ativo: "BID/SDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1502,
          idu: "1502",
          data: "19/06/2025",
          ativo: "OGN/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1501,
          idu: "1501",
          data: "19/06/2025",
          ativo: "SXP/USDT",
          direcao: "LONG",
          percentual: 140,
          alvo: 8
        },
        {
          id: 1500,
          idu: "1500",
          data: "19/06/2025",
          ativo: "ANIME/USDT",
          direcao: "SHORT",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1499,
          idu: "1499",
          data: "19/06/2025",
          ativo: "XTZ/USDT",
          direcao: "SHORT",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1498,
          idu: "1498",
          data: "19/06/2025",
          ativo: "1000000BOB/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1497,
          idu: "1497",
          data: "19/06/2025",
          ativo: "SEI/USDT",
          direcao: "LONG",
          percentual: 61,
          alvo: 4
        },
        {
          id: 1496,
          idu: "1496",
          data: "18/06/2025",
          ativo: "IO/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1495,
          idu: "1495",
          data: "18/06/2025",
          ativo: "FUN/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1494,
          idu: "1494",
          data: "18/06/2025",
          ativo: "BAND/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1493,
          idu: "1493",
          data: "18/06/2025",
          ativo: "ADA/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1492,
          idu: "1492",
          data: "18/06/2025",
          ativo: "TRX/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1491,
          idu: "1491",
          data: "18/06/2025",
          ativo: "THETA/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 6
        },
        {
          id: 1490,
          idu: "1490",
          data: "18/06/2025",
          ativo: "F/USDT",
          direcao: "LONG",
          percentual: 140,
          alvo: 8
        },
        {
          id: 1489,
          idu: "1489",
          data: "18/06/2025",
          ativo: "XRP/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1488,
          idu: "1488",
          data: "18/06/2025",
          ativo: "A/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1487,
          idu: "1487",
          data: "18/06/2025",
          ativo: "CRV/USDT",
          direcao: "LONG",
          percentual: 120,
          alvo: 7
        },
        {
          id: 1486,
          idu: "1486",
          data: "18/06/2025",
          ativo: "WIF/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1485,
          idu: "1485",
          data: "18/06/2025",
          ativo: "JASMY/USDT",
          direcao: "LONG",
          percentual: 120,
          alvo: 7
        },
        {
          id: 1484,
          idu: "1484",
          data: "18/06/2025",
          ativo: "HEDAL/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1483,
          idu: "1483",
          data: "18/06/2025",
          ativo: "ZK/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1482,
          idu: "1482",
          data: "18/06/2025",
          ativo: "MAGIC/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1481,
          idu: "1481",
          data: "18/06/2025",
          ativo: "EIGEN/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1480,
          idu: "1480",
          data: "17/06/2025",
          ativo: "ALGO/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1479,
          idu: "1479",
          data: "17/06/2025",
          ativo: "LINK/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1478,
          idu: "1478",
          data: "17/06/2025",
          ativo: "OBOL/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1477,
          idu: "1477",
          data: "17/06/2025",
          ativo: "ATOM/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1476,
          idu: "1476",
          data: "17/06/2025",
          ativo: "CRV/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1475,
          idu: "1475",
          data: "17/06/2025",
          ativo: "SPK/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1474,
          idu: "1474",
          data: "17/06/2025",
          ativo: "HOME/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1473,
          idu: "1473",
          data: "17/06/2025",
          ativo: "ICX/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1472,
          idu: "1472",
          data: "17/06/2025",
          ativo: "KNC/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1471,
          idu: "1471",
          data: "17/06/2025",
          ativo: "RUNE/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1470,
          idu: "1470",
          data: "17/06/2025",
          ativo: "RESOLV/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1469,
          idu: "1469",
          data: "17/06/2025",
          ativo: "KAVA/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1468,
          idu: "1468",
          data: "17/06/2025",
          ativo: "SPK/USDT",
          direcao: "LONG",
          percentual: -60,
          alvo: 4
        },
        {
          id: 1467,
          idu: "1467",
          data: "17/06/2025",
          ativo: "JTO/USDT",
          direcao: "SHORT",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1466,
          idu: "1466",
          data: "17/06/2025",
          ativo: "XRP/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1465,
          idu: "1465",
          data: "17/06/2025",
          ativo: "BAT/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1464,
          idu: "1464",
          data: "17/06/2025",
          ativo: "OBOL/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1463,
          idu: "1463",
          data: "16/06/2025",
          ativo: "TRX/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1462,
          idu: "1462",
          data: "16/06/2025",
          ativo: "EGLD/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1461,
          idu: "1461",
          data: "16/06/2025",
          ativo: "SOL/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1460,
          idu: "1460",
          data: "16/06/2025",
          ativo: "SNX/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1459,
          idu: "1459",
          data: "16/06/2025",
          ativo: "APE/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1458,
          idu: "1458",
          data: "16/06/2025",
          ativo: "T/USDT",
          direcao: "LONG",
          percentual: 61,
          alvo: 4
        },
        {
          id: 1457,
          idu: "1457",
          data: "16/06/2025",
          ativo: "SUN/USDT",
          direcao: "LONG",
          percentual: 140,
          alvo: 8
        },
        {
          id: 1456,
          idu: "1456",
          data: "16/06/2025",
          ativo: "D/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1455,
          idu: "1455",
          data: "16/06/2025",
          ativo: "PENGU/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1454,
          idu: "1454",
          data: "16/06/2025",
          ativo: "HAEDAL/USDT",
          direcao: "LONG",
          percentual: 160,
          alvo: 9
        },
        {
          id: 1453,
          idu: "1453",
          data: "16/06/2025",
          ativo: "HAEDAL/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1452,
          idu: "1452",
          data: "16/06/2025",
          ativo: "MUBRAK/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1451,
          idu: "1451",
          data: "16/06/2025",
          ativo: "MOVE/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1450,
          idu: "1450",
          data: "15/06/2025",
          ativo: "RLC/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1449,
          idu: "1449",
          data: "15/06/2025",
          ativo: "SUSHI/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1448,
          idu: "1448",
          data: "15/06/2025",
          ativo: "SKATE/USDT",
          direcao: "LONG",
          percentual: 140,
          alvo: 8
        },
        {
          id: 1447,
          idu: "1447",
          data: "15/06/2025",
          ativo: "ZKJ/USDT",
          direcao: "LONG",
          percentual: 102,
          alvo: 6
        },
        {
          id: 1446,
          idu: "1446",
          data: "15/06/2025",
          ativo: "NEIRO/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1445,
          idu: "1445",
          data: "15/06/2025",
          ativo: "SKATE/USDT",
          direcao: "LONG",
          percentual: 180,
          alvo: 10
        },
        {
          id: 1444,
          idu: "1444",
          data: "15/06/2025",
          ativo: "THE/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1443,
          idu: "1443",
          data: "15/06/2025",
          ativo: "DOGE/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1442,
          idu: "1442",
          data: "15/06/2025",
          ativo: "CRV/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1441,
          idu: "1441",
          data: "15/06/2025",
          ativo: "BMT/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1440,
          idu: "1440",
          data: "15/06/2025",
          ativo: "RLP/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1439,
          idu: "1439",
          data: "15/06/2025",
          ativo: "RVN/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1438,
          idu: "1438",
          data: "14/06/2025",
          ativo: "BCH/USDT",
          direcao: "LONG",
          percentual: 180,
          alvo: 10
        },
        {
          id: 1437,
          idu: "1437",
          data: "14/06/2025",
          ativo: "1000LUNC/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1436,
          idu: "1436",
          data: "14/06/2025",
          ativo: "FARTCOIN/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1435,
          idu: "1435",
          data: "14/06/2025",
          ativo: "TRB/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1434,
          idu: "1434",
          data: "14/06/2025",
          ativo: "GAS/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1433,
          idu: "1433",
          data: "14/06/2025",
          ativo: "JTO/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1432,
          idu: "1432",
          data: "14/06/2025",
          ativo: "AIXBT/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1431,
          idu: "1431",
          data: "14/06/2025",
          ativo: "SOON/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1430,
          idu: "1430",
          data: "14/06/2025",
          ativo: "TAIKO/SDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1429,
          idu: "1429",
          data: "14/06/2025",
          ativo: "CHESS/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1428,
          idu: "1428",
          data: "13/06/2025",
          ativo: "PUMPBTC/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1427,
          idu: "1427",
          data: "13/06/2025",
          ativo: "DOGE/USDT",
          direcao: "LONG",
          percentual: 55,
          alvo: 4
        },
        {
          id: 1426,
          idu: "1426",
          data: "13/06/2025",
          ativo: "MOODENG/USDT",
          direcao: "LONG",
          percentual: 120,
          alvo: 7
        },
        {
          id: 1425,
          idu: "1425",
          data: "13/06/2025",
          ativo: "MOODENG/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1424,
          idu: "1424",
          data: "13/06/2025",
          ativo: "HYPE/USDT",
          direcao: "SHORT",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1423,
          idu: "1423",
          data: "13/06/2025",
          ativo: "LDO/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1422,
          idu: "1422",
          data: "13/06/2025",
          ativo: "AI/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1421,
          idu: "1421",
          data: "13/06/2025",
          ativo: "AERO/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1420,
          idu: "1420",
          data: "13/06/2025",
          ativo: "HOME/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1419,
          idu: "1419",
          data: "12/06/2025",
          ativo: "HIGH/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1418,
          idu: "1418",
          data: "12/06/2025",
          ativo: "CHESS/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1417,
          idu: "1417",
          data: "12/06/2025",
          ativo: "SPX/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1416,
          idu: "1416",
          data: "12/06/2025",
          ativo: "HAEDAL/USDT",
          direcao: "LONG",
          percentual: 120,
          alvo: 7
        },
        {
          id: 1415,
          idu: "1415",
          data: "12/06/2025",
          ativo: "FARTCOIN/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1414,
          idu: "1414",
          data: "12/06/2025",
          ativo: "FARTCOIN/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1413,
          idu: "1413",
          data: "12/06/2025",
          ativo: "HOME/USDT",
          direcao: "SHORT",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1412,
          idu: "1412",
          data: "12/06/2025",
          ativo: "XLM/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1411,
          idu: "1411",
          data: "12/06/2025",
          ativo: "IOTA/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1410,
          idu: "1410",
          data: "12/06/2025",
          ativo: "DEGO/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1409,
          idu: "1409",
          data: "12/06/2025",
          ativo: "EPT/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1408,
          idu: "1408",
          data: "12/06/2025",
          ativo: "VIRTUAL/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1407,
          idu: "1407",
          data: "12/06/2025",
          ativo: "B3/USDT",
          direcao: "LONG",
          percentual: 120,
          alvo: 7
        },
        {
          id: 1406,
          idu: "1406",
          data: "12/06/2025",
          ativo: "HOME/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1405,
          idu: "1405",
          data: "11/06/2025",
          ativo: "MOVR/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1404,
          idu: "1404",
          data: "11/06/2025",
          ativo: "CGPT/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1403,
          idu: "1403",
          data: "11/06/2025",
          ativo: "RARE/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1402,
          idu: "1402",
          data: "11/06/2025",
          ativo: "TWT/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1401,
          idu: "1401",
          data: "11/06/2025",
          ativo: "QNT/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1400,
          idu: "1400",
          data: "11/06/2025",
          ativo: "HMSTR/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1399,
          idu: "1399",
          data: "11/06/2025",
          ativo: "MERL/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1398,
          idu: "1398",
          data: "11/06/2025",
          ativo: "SQD/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1397,
          idu: "1397",
          data: "11/06/2025",
          ativo: "RVN/USDT",
          direcao: "LONG",
          percentual: 140,
          alvo: 8
        },
        {
          id: 1396,
          idu: "1396",
          data: "11/06/2025",
          ativo: "FET/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1395,
          idu: "1395",
          data: "11/06/2025",
          ativo: "RESOLV/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1394,
          idu: "1394",
          data: "11/06/2025",
          ativo: "ICX/USDT",
          direcao: "SHORT",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1393,
          idu: "1393",
          data: "11/06/2025",
          ativo: "WLD/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1392,
          idu: "1392",
          data: "10/06/2025",
          ativo: "PENGU/USDT",
          direcao: "SHORT",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1391,
          idu: "1391",
          data: "10/06/2025",
          ativo: "JTO/USDT",
          direcao: "LONG",
          percentual: 160,
          alvo: 9
        },
        {
          id: 1390,
          idu: "1390",
          data: "10/06/2025",
          ativo: "NXPC/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1389,
          idu: "1389",
          data: "10/06/2025",
          ativo: "CRV/USDT",
          direcao: "SHORT",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1388,
          idu: "1388",
          data: "10/06/2025",
          ativo: "DEXE/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1387,
          idu: "1387",
          data: "10/06/2025",
          ativo: "LISTA/USDT",
          direcao: "SHORT",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1386,
          idu: "1386",
          data: "10/06/2025",
          ativo: "LDO/USDT",
          direcao: "SHORT",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1385,
          idu: "1385",
          data: "10/06/2025",
          ativo: "AXL/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1384,
          idu: "1384",
          data: "10/06/2025",
          ativo: "NEIRO/USDT",
          direcao: "LONG",
          percentual: 176,
          alvo: 10
        },
        {
          id: 1383,
          idu: "1383",
          data: "10/06/2025",
          ativo: "FLM/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1382,
          idu: "1382",
          data: "10/06/2025",
          ativo: "EPT/USDT",
          direcao: "LONG",
          percentual: 180,
          alvo: 10
        },
        {
          id: 1381,
          idu: "1381",
          data: "09/06/2025",
          ativo: "COW/USDT",
          direcao: "LONG",
          percentual: 120,
          alvo: 7
        },
        {
          id: 1380,
          idu: "1380",
          data: "09/06/2025",
          ativo: "LQTY/USDT",
          direcao: "SHORT",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1379,
          idu: "1379",
          data: "09/06/2025",
          ativo: "MOODENG/USDT",
          direcao: "LONG",
          percentual: 120,
          alvo: 7
        },
        {
          id: 1378,
          idu: "1378",
          data: "09/06/2025",
          ativo: "UMA/USDT",
          direcao: "LONG",
          percentual: 120,
          alvo: 7
        },
        {
          id: 1377,
          idu: "1377",
          data: "09/06/2025",
          ativo: "LPT/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1376,
          idu: "1376",
          data: "09/06/2025",
          ativo: "ZRO/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1375,
          idu: "1375",
          data: "09/06/2025",
          ativo: "RSR/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1374,
          idu: "1374",
          data: "09/06/2025",
          ativo: "REI/USDT",
          direcao: "LONG",
          percentual: 140,
          alvo: 8
        },
        {
          id: 1373,
          idu: "1373",
          data: "09/06/2025",
          ativo: "AUCTION/USDT",
          direcao: "LONG",
          percentual: 140,
          alvo: 8
        },
        {
          id: 1372,
          idu: "1372",
          data: "08/06/2025",
          ativo: "AI/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1371,
          idu: "1371",
          data: "08/06/2025",
          ativo: "MASK/SDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1370,
          idu: "1370",
          data: "08/06/2025",
          ativo: "BROCCOLI714/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1369,
          idu: "1369",
          data: "08/06/2025",
          ativo: "POPCAT/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1368,
          idu: "1368",
          data: "08/06/2025",
          ativo: "MOVR/USDT",
          direcao: "SHORT",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1367,
          idu: "1367",
          data: "08/06/2025",
          ativo: "1000000BOB/USDT",
          direcao: "LONG",
          percentual: 160,
          alvo: 9
        },
        {
          id: 1366,
          idu: "1366",
          data: "08/06/2025",
          ativo: "RVN/USDT",
          direcao: "LONG",
          percentual: 120,
          alvo: 7
        },
        {
          id: 1365,
          idu: "1365",
          data: "08/06/2025",
          ativo: "ZK/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1364,
          idu: "1364",
          data: "08/06/2025",
          ativo: "FUN/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1363,
          idu: "1363",
          data: "07/06/2025",
          ativo: "ANIME/USDT",
          direcao: "LONG",
          percentual: 140,
          alvo: 8
        },
        {
          id: 1362,
          idu: "1362",
          data: "07/06/2025",
          ativo: "GPS/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1361,
          idu: "1361",
          data: "07/06/2025",
          ativo: "TURBO/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1360,
          idu: "1360",
          data: "07/06/2025",
          ativo: "TRUMP/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1359,
          idu: "1359",
          data: "07/06/2025",
          ativo: "GMX/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1358,
          idu: "1358",
          data: "07/06/2025",
          ativo: "SYRUP?USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1357,
          idu: "1357",
          data: "07/06/2025",
          ativo: "FFET/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1356,
          idu: "1356",
          data: "07/06/2025",
          ativo: "ICX/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1355,
          idu: "1355",
          data: "07/06/2025",
          ativo: "ETHFI/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1354,
          idu: "1354",
          data: "07/06/2025",
          ativo: "GHST/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1353,
          idu: "1353",
          data: "06/06/2025",
          ativo: "HIFI/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1352,
          idu: "1352",
          data: "06/06/2025",
          ativo: "STO/USDT",
          direcao: "LONG",
          percentual: 140,
          alvo: 8
        },
        {
          id: 1351,
          idu: "1351",
          data: "06/06/2025",
          ativo: "RUNE/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1350,
          idu: "1350",
          data: "06/06/2025",
          ativo: "ANIME/USDT",
          direcao: "LONG",
          percentual: 140,
          alvo: 8
        },
        {
          id: 1349,
          idu: "1349",
          data: "06/06/2025",
          ativo: "1000SHIB/USDT",
          direcao: "SHORT",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1348,
          idu: "1348",
          data: "06/06/2025",
          ativo: "RLC/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1347,
          idu: "1347",
          data: "06/06/2025",
          ativo: "FARTCOIN/USDT",
          direcao: "LONG",
          percentual: 95,
          alvo: 6
        },
        {
          id: 1346,
          idu: "1346",
          data: "05/06/2025",
          ativo: "CRV/USDT",
          direcao: "LONG",
          percentual: 62,
          alvo: 4
        },
        {
          id: 1345,
          idu: "1345",
          data: "05/06/2025",
          ativo: "C98/USDT",
          direcao: "LONG",
          percentual: 43,
          alvo: 3
        },
        {
          id: 1344,
          idu: "1344",
          data: "05/06/2025",
          ativo: "RARE/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1343,
          idu: "1343",
          data: "05/06/2025",
          ativo: "MANTA/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1342,
          idu: "1342",
          data: "05/06/2025",
          ativo: "HIGH/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1341,
          idu: "1341",
          data: "05/06/2025",
          ativo: "SOL/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1340,
          idu: "1340",
          data: "05/06/2025",
          ativo: "LA/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1339,
          idu: "1339",
          data: "05/06/2025",
          ativo: "RLC/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1338,
          idu: "1338",
          data: "05/06/2025",
          ativo: "REI/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1337,
          idu: "1337",
          data: "05/06/2025",
          ativo: "CELO/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1336,
          idu: "1336",
          data: "05/06/2025",
          ativo: "AIOT/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1335,
          idu: "1335",
          data: "05/06/2025",
          ativo: "B3/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1334,
          idu: "1334",
          data: "04/06/2025",
          ativo: "CRV/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1333,
          idu: "1333",
          data: "04/06/2025",
          ativo: "OGN/USDT",
          direcao: "LONG",
          percentual: 175,
          alvo: 10
        },
        {
          id: 1332,
          idu: "1332",
          data: "04/06/2025",
          ativo: "CGPT/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1331,
          idu: "1331",
          data: "04/06/2025",
          ativo: "SPX/USDT",
          direcao: "LONG",
          percentual: 172,
          alvo: 10
        },
        {
          id: 1330,
          idu: "1330",
          data: "04/06/2025",
          ativo: "VIC/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1329,
          idu: "1329",
          data: "04/06/2025",
          ativo: "OP/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1328,
          idu: "1328",
          data: "04/06/2025",
          ativo: "XMR/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1327,
          idu: "1327",
          data: "04/06/2025",
          ativo: "1000WHY/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1326,
          idu: "1326",
          data: "04/06/2025",
          ativo: "DEGO/USDT",
          direcao: "LONG",
          percentual: 174,
          alvo: 10
        },
        {
          id: 1325,
          idu: "1325",
          data: "04/06/2025",
          ativo: "WAXP/USDT",
          direcao: "LONG",
          percentual: 120,
          alvo: 7
        },
        {
          id: 1324,
          idu: "1324",
          data: "04/06/2025",
          ativo: "COW/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1323,
          idu: "1323",
          data: "04/06/2025",
          ativo: "ATH/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1322,
          idu: "1322",
          data: "03/06/2025",
          ativo: "MELANIA/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1321,
          idu: "1321",
          data: "03/06/2025",
          ativo: "RPL/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1320,
          idu: "1320",
          data: "03/06/2025",
          ativo: "DEXE/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        },
        {
          id: 1319,
          idu: "1319",
          data: "03/06/2025",
          ativo: "FORM/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1318,
          idu: "1318",
          data: "03/06/2025",
          ativo: "NEAR/USDT",
          direcao: "LONG",
          percentual: 60,
          alvo: 4
        },
        {
          id: 1317,
          idu: "1317",
          data: "03/06/2025",
          ativo: "KAIA/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1316,
          idu: "1316",
          data: "03/06/2025",
          ativo: "BID/SDT",
          direcao: "LONG",
          percentual: 140,
          alvo: 8
        },
        {
          id: 1315,
          idu: "1315",
          data: "03/06/2025",
          ativo: "PROM/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1314,
          idu: "1314",
          data: "02/06/2025",
          ativo: "FLM/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1313,
          idu: "1313",
          data: "02/06/2025",
          ativo: "CTK/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1312,
          idu: "1312",
          data: "02/06/2025",
          ativo: "KAITO/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1311,
          idu: "1311",
          data: "02/06/2025",
          ativo: "ZEN/USDT",
          direcao: "LONG",
          percentual: 180,
          alvo: 10
        },
        {
          id: 1310,
          idu: "1310",
          data: "02/06/2025",
          ativo: "ZEREBRO/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1309,
          idu: "1309",
          data: "02/06/2025",
          ativo: "SSV/USDT",
          direcao: "LONG",
          percentual: 180,
          alvo: 10
        },
        {
          id: 1308,
          idu: "1308",
          data: "02/06/2025",
          ativo: "DYDX/USDT",
          direcao: "LONG",
          percentual: 77,
          alvo: 5
        },
        {
          id: 1307,
          idu: "1307",
          data: "01/06/2025",
          ativo: "IOTA/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1306,
          idu: "1306",
          data: "01/06/2025",
          ativo: "1000LUNC/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1305,
          idu: "1305",
          data: "01/06/2025",
          ativo: "HUMA/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1304,
          idu: "1304",
          data: "01/06/2025",
          ativo: "QNT/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1303,
          idu: "1303",
          data: "01/06/2025",
          ativo: "SFP/USDT",
          direcao: "LONG",
          percentual: 20,
          alvo: 2
        },
        {
          id: 1302,
          idu: "1302",
          data: "01/06/2025",
          ativo: "B3/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1301,
          idu: "1301",
          data: "01/06/2025",
          ativo: "GPS/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1300,
          idu: "1300",
          data: "01/06/2025",
          ativo: "KMNO/USDT",
          direcao: "LONG",
          percentual: -100,
          alvo: 0
        },
        {
          id: 1299,
          idu: "1299",
          data: "01/06/2025",
          ativo: "ENA/USDT",
          direcao: "LONG",
          percentual: 80,
          alvo: 5
        },
        {
          id: 1298,
          idu: "1298",
          data: "01/06/2025",
          ativo: "1000RATS/USDT",
          direcao: "LONG",
          percentual: 40,
          alvo: 3
        },
        {
          id: 1297,
          idu: "1297",
          data: "01/06/2025",
          ativo: "VANA/USDT",
          direcao: "LONG",
          percentual: 200,
          alvo: 11
        },
        {
          id: 1296,
          idu: "1296",
          data: "01/06/2025",
          ativo: "SSV/USDT",
          direcao: "LONG",
          percentual: 100,
          alvo: 6
        }
      // Adicionar o resto dos trades de junho aqui...
    ];

    console.log(`[Reports] Carregados ${dadosAmostra.length} dados de amostra`);
    setTrades(dadosAmostra);
    setPagination({
      page: 1,
      limit: 300,
      total: dadosAmostra.length,
      totalPages: 1,
      hasNext: false,
      hasPrev: false
    });
    setLoading(false);
    setErrorState({hasError: false, message: ''});
  };

  // Função para buscar dados da API
  const fetchTrades = async (page: number = 1, accumulatedTrades: Trade[] = []) => {
    if (page === 1) {
      setLoading(true);
      setErrorState({ hasError: false, message: '' });
    }

    try {
      const year = 2025;
      const month = selectedMonth;
      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);

      const dataInicio = firstDay.toISOString().split('T')[0];
      const dataFim = lastDay.toISOString().split('T')[0];

      console.log(`[Reports] Buscando dados de ${dataInicio} até ${dataFim} (página ${page})`);

      const response = await fetch(
        `${API_ENDPOINTS[0]}?dataInicio=${dataInicio}&dataFim=${dataFim}&page=${page}&limit=300`,
        {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
          signal: AbortSignal.timeout(20000) // 20 segundos timeout
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: APIResponse = await response.json();
      const tradesData = extrairDadosDaAPI(responseData);
      const allTrades = [...accumulatedTrades, ...tradesData];
      
      console.log(`[Reports] ${tradesData.length} trades encontrados na página ${page}. Total até agora: ${allTrades.length}`);
      
      // Atualizar o estado apenas se tivermos dados
      if (tradesData.length > 0) {
        setTrades(allTrades);
        setPagination(responseData.meta);

        // Se houver próxima página, buscar mais dados
        if (responseData.meta.hasNext) {
          // Adicionar um pequeno delay para evitar sobrecarga
          await new Promise(resolve => setTimeout(resolve, 500));
          await fetchTrades(page + 1, allTrades);
        } else {
          // Terminamos de carregar todos os dados
          console.log(`[Reports] Carregamento completo. Total de trades: ${allTrades.length}`);
          setLoading(false);
        }
      } else {
        if (page === 1) {
          // Se não encontramos dados na primeira página, carregar dados de amostra
          console.log('[Reports] Nenhum trade encontrado, carregando dados de amostra');
          carregarDadosAmostra();
        } else {
          // Se não encontramos dados em páginas subsequentes, finalizar o carregamento
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('[Reports] Erro ao buscar trades:', error);
      if (page === 1) {
        carregarDadosAmostra();
      } else {
        // Se o erro ocorreu em páginas subsequentes, manter os dados que já temos
        setLoading(false);
      }
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      if (!isMounted) return;
      setTrades([]); // Limpar trades ao mudar de mês
      await fetchTrades(1, []); // Iniciar carregamento com array vazio
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, [selectedMonth]);

  // Filtrar os trades com base nos critérios de busca
  const filteredData = useMemo(() => {
    return trades
      .filter(trade => {
        const matchesSearch = searchTerm === '' || 
          trade.ativo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDirection = selectedDirection === 'ALL' || 
          trade.direcao === selectedDirection;
        
        // Log para debug
        if (!matchesSearch || !matchesDirection) {
          console.log(`[Reports] Trade filtrado - ID: ${trade.id}, Ativo: ${trade.ativo}, Direção: ${trade.direcao}`);
          console.log(`[Reports] Motivo: ${!matchesSearch ? 'Não corresponde à busca' : 'Não corresponde à direção'}`);
        }
        
        return matchesSearch && matchesDirection;
      })
      .sort((a, b) => {
        // Ordenar por ID decrescente (mais recente primeiro)
        return b.id - a.id;
      });
  }, [trades, searchTerm, selectedDirection]);

  // Calcular estatísticas
  const totalOperacoes = filteredData.length;
  const operacoesLucrativas = filteredData.filter(t => t.percentual > 0).length;
  const taxaAcerto = totalOperacoes > 0 ? ((operacoesLucrativas / totalOperacoes) * 100) : 0;
  const valorizacaoTotal = filteredData.reduce((acc, curr) => acc + curr.percentual, 0);

  // Adicionar log para debug
  useEffect(() => {
    console.log(`[Reports] Total de trades carregados: ${trades.length}`);
    console.log(`[Reports] Total de trades após filtro: ${filteredData.length}`);
    console.log(`[Reports] Critérios de filtro - Busca: "${searchTerm}", Direção: ${selectedDirection}`);
  }, [trades.length, filteredData.length, searchTerm, selectedDirection]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        <p className="text-white text-sm">Carregando resultados...</p>
        <p className="text-neutral-400 text-xs">Aguarde alguns instantes</p>
      </div>
    );
  }

  // Adicionar verificação de dados vazios
  if (!loading && (!trades || trades.length === 0)) {
    return (
      <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center gap-4">
        <p className="text-white text-sm">Nenhum resultado encontrado</p>
        <button
          onClick={() => {
            setTrades([]); // Limpar trades antes de tentar novamente
            fetchTrades(1);
          }}
          className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20 transition text-sm"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Header com Logo */}
      <header className="py-8 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.jpg"
              alt="Futuros Tech"
              width={80}
              height={80}
              className="rounded"
            />
          </Link>
          
          <a
            href="https://ai.futurostech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
          >
            Área VIP
            <ChevronRight className="h-3 w-3" />
          </a>
        </div>
      </header>

      <main className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Botão Assinar */}
          <div className="flex justify-center mb-12">
            <Link 
              href="/#planos"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-2 rounded-full text-sm hover:bg-white/20 transition"
            >
              Assine Agora
            </Link>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-xs text-gray-400 mb-2">Pesquisar Ativo</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: BTC/USDT"
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Direção</label>
              <select
                value={selectedDirection}
                onChange={(e) => setSelectedDirection(e.target.value as 'ALL' | 'LONG' | 'SHORT')}
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300"
              >
                <option value="ALL">Todas</option>
                <option value="LONG">Long</option>
                <option value="SHORT">Short</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Mês</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-300"
              >
                {availableMonths.map((month) => (
                  <option key={month.number} value={month.number}>
                    {month.name} de 2025
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards de estatísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <PieChart className="h-4 w-4 text-green-400" strokeWidth={1.5} />
                <span className="text-sm text-gray-400">Win Rate</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-white">
                  {taxaAcerto?.toFixed(1)}%
                </span>
                <span className="text-xs text-gray-500">
                  {operacoesLucrativas}/{totalOperacoes}
                </span>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-emerald-400" strokeWidth={1.5} />
                <span className="text-sm text-gray-400">Resultado Total</span>
              </div>
              <div className="text-2xl font-light text-white">
                {valorizacaoTotal > 0 ? '+' : ''}{valorizacaoTotal?.toFixed(1)}%
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="h-4 w-4 text-green-400" strokeWidth={1.5} />
                <span className="text-sm text-gray-400">Total de Sinais</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-white">{totalOperacoes}</span>
                <span className="text-xs text-gray-500">operações</span>
              </div>
            </div>
          </div>

          {errorState.hasError ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
              <p className="text-red-400 mb-4">{errorState.message}</p>
              <button
                onClick={() => {
                  setTrades([]); // Limpar trades antes de tentar novamente
                  fetchTrades(1);
                }}
                className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20 transition"
              >
                Tentar Novamente
              </button>
            </div>
          ) : (
            /* Tabela responsiva */
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-800">
                <thead>
                  <tr>
                    <th scope="col" className="py-3 text-left text-xs font-medium text-gray-400">Data</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400">Ativo</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400">Direção</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400">Resultado</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400">Alvo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredData.map((trade, index) => (
                    <tr key={index} className="hover:bg-gray-800/50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-300 sm:pl-0">
                        {trade.data}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-300">
                        {trade.ativo}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          trade.direcao === 'LONG'
                            ? 'bg-green-400/10 text-green-400 ring-green-400/20'
                            : 'bg-red-400/10 text-red-400 ring-red-400/20'
                        }`}>
                          {trade.direcao}
                        </span>
                      </td>
                      <td className={`whitespace-nowrap px-3 py-4 text-sm ${
                        trade.percentual >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {trade.percentual >= 0 ? '+' : ''}{trade.percentual}%
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {trade.alvo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          )}
        </div>
      </main>
    </div>
  );
}
