import { Star, MapPin, Clock, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package } from '@/hooks/usePackages';
import PlanButton from '@/components/PlanButton';

interface PackageCardProps {
  package: Package;
}

const PackageCard = ({ package: pkg }: PackageCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/my-tour/package/${pkg.id}`);
  };

  
  const handlePlanClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation when clicking heart
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when button is clicked
    navigate(`/my-tour/package/${pkg.id}`);
  };

  return (
    <Card
      className="mobile-card mobile-card-hover h-full flex flex-col group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={pkg.image_url || '/placeholder.svg'}
          alt={pkg.title}
          className="w-full h-48 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        {/* Bottom fade for legibility */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Plan Button (Heart Icon) */}
        <div className="absolute top-3 left-3" onClick={handlePlanClick}>
          <PlanButton
            itemId={pkg.id}
            itemType="package"
            itemName={pkg.title}
            variant="compact"
          />
        </div>

        <div className="absolute top-3 right-3">
          <Badge className="bg-white/95 text-foreground text-[10px] tracking-wider font-bold uppercase px-2.5 py-1 rounded-full shadow-sm border-0">
            {pkg.package_code}
          </Badge>
        </div>

        {/* Price chip */}
        <div className="absolute bottom-3 right-3">
          <div className="px-3 py-1.5 rounded-full bg-gradient-sunset text-white text-sm font-bold shadow-warm">
            {pkg.price}
          </div>
        </div>
      </div>

      <CardContent className="mobile-card-content flex-1">
        <h3 className="font-display text-lg sm:text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-tight">{pkg.title}</h3>

        <div className="flex items-center mobile-text-sm text-muted-foreground mb-2.5">
          <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary" />
          <span className="font-medium">{pkg.location}</span>
        </div>

        <div className="flex items-center justify-between mobile-text-sm text-muted-foreground mb-3 pb-3 border-b border-border/60">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-primary" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1.5 text-primary" />
            <span>{pkg.group_size}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 mr-1" />
            <span className="font-semibold text-foreground">{pkg.rating.toFixed(1)}</span>
            <span className="ml-1 text-xs">({pkg.reviews_count})</span>
          </div>
        </div>

        {pkg.features.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1.5">
              {pkg.features.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="outline" className="mobile-text-sm px-2.5 py-0.5 rounded-full border-primary/30 text-primary bg-primary/5">
                  {feature}
                </Badge>
              ))}
              {pkg.features.length > 2 && (
                <Badge variant="outline" className="mobile-text-sm px-2.5 py-0.5 rounded-full">
                  +{pkg.features.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}

        {pkg.locations_included.length > 0 && (
          <div className="mobile-text-sm text-muted-foreground">
            <span className="font-semibold text-foreground/80">Includes:</span> {pkg.locations_included.slice(0, 1).join(', ')}
            {pkg.locations_included.length > 1 && ` +${pkg.locations_included.length - 1} more`}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="mobile-btn-primary w-full"
          onClick={handleButtonClick}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;