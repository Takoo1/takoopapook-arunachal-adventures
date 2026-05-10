import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Users, MapPin as MapPinIcon, Calendar as CalendarIcon, Info } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLocations } from '@/hooks/useLocations';
import DestinationCard from '@/components/DestinationCard';
import AppLayout from '@/components/AppLayout';
import { cn } from '@/lib/utils';
import type { Location } from '@/types/database';
import type { DateRange } from 'react-day-picker';

// Pre-defined pricing (placeholder values – tweak later)
const BASE_PRICE = 4000; // base per person
const PRICE_PER_PERSON = 1500;
const PRICE_PER_DAY = 1200;
const PRICE_PER_NIGHT = 800;
const TOUR_GUIDE_PRICE = 2000;
const NEAREST_ADDON_PRICES = [500, 600, 500]; // matches up to 3 nearest neighbors

const distance = (a: Location, b: Location) => {
  const dx = (a.coordinates_x ?? 0) - (b.coordinates_x ?? 0);
  const dy = (a.coordinates_y ?? 0) - (b.coordinates_y ?? 0);
  return Math.sqrt(dx * dx + dy * dy);
};

const CustomPackage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: locations = [] } = useLocations();

  const destination = locations.find((l) => l.id === id);

  const nearest = useMemo(() => {
    if (!destination) return [] as Location[];
    return locations
      .filter((l) => l.id !== destination.id)
      .map((l) => ({ loc: l, d: distance(destination, l) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .map((x, idx) => ({ ...x.loc, _addonPrice: NEAREST_ADDON_PRICES[idx] ?? 500 } as Location & { _addonPrice: number }));
  }, [destination, locations]);

  const [extraDestinationIds, setExtraDestinationIds] = useState<string[]>([]);
  const [people, setPeople] = useState<number>(2);
  const [needsGuide, setNeedsGuide] = useState<'yes' | 'no'>('no');
  const [planMode, setPlanMode] = useState<'duration' | 'dates'>('duration');
  const [days, setDays] = useState<number>(2);
  const [nights, setNights] = useState<number>(1);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const toggleExtra = (locId: string) => {
    setExtraDestinationIds((prev) =>
      prev.includes(locId) ? prev.filter((x) => x !== locId) : [...prev, locId]
    );
  };

  const dateRangeDays = useMemo(() => {
    if (planMode !== 'dates' || !dateRange?.from || !dateRange?.to) return 0;
    const ms = dateRange.to.getTime() - dateRange.from.getTime();
    return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)) + 1);
  }, [planMode, dateRange]);

  const breakdown = useMemo(() => {
    const items: { label: string; amount: number }[] = [];
    items.push({ label: 'Base package', amount: BASE_PRICE });
    items.push({ label: `${people} traveler(s)`, amount: people * PRICE_PER_PERSON });

    nearest.forEach((n) => {
      if (extraDestinationIds.includes(n.id)) {
        items.push({ label: `Add: ${n.name}`, amount: (n as any)._addonPrice });
      }
    });

    if (needsGuide === 'yes') {
      items.push({ label: 'Tour guide', amount: TOUR_GUIDE_PRICE });
    }

    if (planMode === 'duration') {
      if (days > 0) items.push({ label: `${days} day(s)`, amount: days * PRICE_PER_DAY });
      if (nights > 0) items.push({ label: `${nights} night(s)`, amount: nights * PRICE_PER_NIGHT });
    } else if (dateRangeDays > 0) {
      items.push({ label: `${dateRangeDays} day(s) trip`, amount: dateRangeDays * PRICE_PER_DAY });
    }

    const total = items.reduce((s, i) => s + i.amount, 0);
    return { items, total };
  }, [people, extraDestinationIds, nearest, needsGuide, planMode, days, nights, dateRangeDays]);

  if (!destination) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Destination not found</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="mobile-container mobile-section space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">Custom Package</h1>
              <p className="text-xs text-muted-foreground">Tailor a trip just for you</p>
            </div>
          </div>

          {/* Destination Card */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Starting destination</p>
            <DestinationCard location={destination} onClick={() => {}} />
          </div>

          {/* Build your package */}
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                Build your package
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 1. Destinations */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4 text-primary" />
                  1. Destinations included
                </Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-primary/5">
                    <div className="flex items-center gap-2">
                      <Checkbox checked disabled />
                      <span className="text-sm font-medium">Only {destination.name}</span>
                    </div>
                    <Badge variant="secondary">Included</Badge>
                  </div>
                  {nearest.map((n) => {
                    const checked = extraDestinationIds.includes(n.id);
                    return (
                      <label
                        key={n.id}
                        className={cn(
                          'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors',
                          checked ? 'bg-primary/10 border-primary/40' : 'hover:bg-muted/50'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox checked={checked} onCheckedChange={() => toggleExtra(n.id)} />
                          <span className="text-sm font-medium">Include {n.name}</span>
                        </div>
                        <Badge variant="outline">+₹{(n as any)._addonPrice}</Badge>
                      </label>
                    );
                  })}
                  {nearest.length === 0 && (
                    <p className="text-xs text-muted-foreground">No nearby destinations available.</p>
                  )}
                </div>
              </div>

              <Separator />

              {/* 2. Number of people */}
              <div className="space-y-2">
                <Label htmlFor="people" className="text-sm font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  2. Number of people
                </Label>
                <Input
                  id="people"
                  type="number"
                  min={1}
                  max={50}
                  value={people}
                  onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value || '1', 10)))}
                />
                <p className="text-xs text-muted-foreground">+₹{PRICE_PER_PERSON} per person</p>
              </div>

              <Separator />

              {/* 3. Tour guide */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">3. Require tour guide?</Label>
                <RadioGroup
                  value={needsGuide}
                  onValueChange={(v) => setNeedsGuide(v as 'yes' | 'no')}
                  className="flex gap-3"
                >
                  <label className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors flex-1',
                    needsGuide === 'yes' ? 'bg-primary/10 border-primary/40' : 'hover:bg-muted/50'
                  )}>
                    <RadioGroupItem value="yes" id="guide-yes" />
                    <span className="text-sm">Yes (+₹{TOUR_GUIDE_PRICE})</span>
                  </label>
                  <label className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors flex-1',
                    needsGuide === 'no' ? 'bg-primary/10 border-primary/40' : 'hover:bg-muted/50'
                  )}>
                    <RadioGroupItem value="no" id="guide-no" />
                    <span className="text-sm">No</span>
                  </label>
                </RadioGroup>
              </div>

              <Separator />

              {/* 4. Time plan */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  4. Enter your time plan
                </Label>
                <Tabs value={planMode} onValueChange={(v) => setPlanMode(v as 'duration' | 'dates')}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="duration">Days / Nights</TabsTrigger>
                    <TabsTrigger value="dates">Date range</TabsTrigger>
                  </TabsList>
                  <TabsContent value="duration" className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="days" className="text-xs">Days</Label>
                      <Input
                        id="days"
                        type="number"
                        min={0}
                        value={days}
                        onChange={(e) => setDays(Math.max(0, parseInt(e.target.value || '0', 10)))}
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">+₹{PRICE_PER_DAY}/day</p>
                    </div>
                    <div>
                      <Label htmlFor="nights" className="text-xs">Nights</Label>
                      <Input
                        id="nights"
                        type="number"
                        min={0}
                        value={nights}
                        onChange={(e) => setNights(Math.max(0, parseInt(e.target.value || '0', 10)))}
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">+₹{PRICE_PER_NIGHT}/night</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="dates" className="mt-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, 'LLL dd, y')} – {format(dateRange.to, 'LLL dd, y')}
                              </>
                            ) : (
                              format(dateRange.from, 'LLL dd, y')
                            )
                          ) : (
                            <span className="text-muted-foreground">Pick a date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={1}
                          initialFocus
                          className={cn('p-3 pointer-events-auto')}
                        />
                      </PopoverContent>
                    </Popover>
                    {dateRangeDays > 0 && (
                      <p className="text-xs text-muted-foreground mt-2">{dateRangeDays} day(s) selected</p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Note */}
              <div className="flex gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  Vehicle and allocation will be managed by us. If you want to use your own vehicle, please contact us.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Price breakdown */}
          <Card className="border-primary/30 shadow-lg sticky bottom-20">
            <CardContent className="p-4 space-y-3">
              <div className="space-y-1.5">
                {breakdown.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-xs text-muted-foreground">
                    <span>{it.label}</span>
                    <span>₹{it.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Estimated total</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{breakdown.total.toLocaleString('en-IN')}
                  </p>
                </div>
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                  Request Package
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CustomPackage;
