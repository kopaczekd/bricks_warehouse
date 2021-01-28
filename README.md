# Bricks Warehouse

#### Technologie

Aplikacja została wykonana w Angularze.

#### Opis

Skład budowlany sprzedaje cegły. Magazyn działa jako kolejka FIFO. Nowe dostawy (partie) są dodawane na koniec kolejki. Natomiast wydania do klientów są realizowane jako pierwsze z kolejki.

Każda partia cegieł dostarczana przez producenta, może być zakupiona w innej cenie. Skład budowlany musi wiedzieć, jaka jest wartość zakupu sprzedanych cegieł w celu określenia opłacalności transakcji.

Oczywiście nie ma pewności, że wydawane partie cegły są takiej samej wielkości jak otrzymane. Może się zdarzyć, że wydajemy cegły z jednej lub kilku kolejnych partii, gdzie pobranie z ostatniej może też być częściowe.

#### Przykład:

|Operacje|Stan kolejki FIFO po wykonaniu operacji|Wartość zakupu|
|---|---|---|
|Otrzymano 1000 cegieł każda po 2,50 zł|1000|
|Wydano 700 cegieł|300|700*2.5 = 1750|
|Otrzymano 200 cegieł każda po 2,40 zł|300 po 2,5 zł, 200 po 2,4 zł|	
|Otrzymano 1000 cegieł każda po 2,30 zł|300 po 2,5 zł, 200 po 2,4 zł, 1000 po 2,3 zł|
|Wydano 1000 cegieł|500 po 2,3 zł| 300 \* 2.5 + 200 \* 2.4 + 500 \* 2.3 = 2380
 
#### Funkcjonalności

- dodawanie partii cegieł w określonej cenie i ilości,
- pobieranie cegieł zgodnie z kolejką FIFO i wyświetlenie wartości zakupu,
- zgłoszenie błędu jeśli nie ma wystarczającej ilości cegieł w sklepie.
