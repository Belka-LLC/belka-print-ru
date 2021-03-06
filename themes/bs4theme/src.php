<?php //src.php

$data_obj = file_get_contents('php://input');

$koeff = 1.3;

$calcData = [
  'viz' => [
    'designPrice' => 300,
    'shippingPrice' => 400,
    'vizPrices' => [
      '1'=> [
        'digital'=> [
          '100'=> 435,
          '200'=> 715,
          '300'=> 970,
          '400'=> 1225,
          '500'=> 1480,
          '600'=> 1730,
          '700'=> 2030,
          '800'=> 2285,
          '900'=> 2540,
          '1000'=> 2790,
        ],
        'offset' => [
          '1000' => $koeff * 760,
          '2000' => $koeff * 1140,
          '3000' => $koeff * 2410,
          '4000' => $koeff * 2730,
          '5000' => $koeff * 3630,
          '6000' => $koeff * 4130,
          '8000' => $koeff * 4930,
          '10000'=> $koeff * 5880,
          '15000'=> $koeff * 9520,
          '20000'=> $koeff * 10530,
        ],
      ],
      '2'=> [
        'digital'=> [
          '100'=> 745,
          '200'=> 1135,
          '300'=> 1525,
          '400'=> 1915,
          '500'=> 2305,
          '600'=> 2695,
          '700'=> 3160,
          '800'=> 3550,
          '900'=> 3940,
          '1000'=> 4330,
        ],
        'offset'=> [
          '1000' => $koeff * 950,
          '2000' => $koeff * 1330,
          '3000' => $koeff * 2680,
          '4000' => $koeff * 3280,
          '5000' => $koeff * 4170,
          '6000' => $koeff * 4800,
          '8000' => $koeff * 6080,
          '10000'=> $koeff * 7350,
          '15000'=> $koeff * 11520,
          '20000'=> $koeff * 12820,
        ],
      ],
    ],
    'cartonPrices' => [
      'cristalBoard'=> [
        'name' => 'Гладкий картон',
        '100'=> 70,
        '200'=> 110,
        '300'=> 150,
        '400'=> 190,
        '500'=> 230,
        '600'=> 270,
        '700'=> 320,
        '800'=> 360,
        '900'=> 400,
        '1000' => 440,
      ],
      'linen'=> [
        'name' => 'Фактурный картон (лён)',
        '100'=> 290,
        '200'=> 455,
        '300'=> 620,
        '400'=> 785,
        '500'=> 950,
        '600'=> 1115,
        '700'=> 1320,
        '800'=> 1485,
        '900'=> 1650,
        '1000'=> 1815,
      ],
      'sirioPearl'=> [
        'name' => 'Дизайнерский картон',
        '100'=> 545,
        '200'=> 600,
        '300'=> 815,
        '400'=> 1030,
        '500'=> 1250,
        '600'=> 1470,
        '700'=> 1740,
        '800'=> 1955,
        '900'=> 2175,
        '1000'=> 2390,
      ]
    ]
  ],
];

echo json_encode($calcData['viz']);
