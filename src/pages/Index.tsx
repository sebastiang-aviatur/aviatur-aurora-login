import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-animated">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20 animate-gradient-shift bg-[length:400%_400%]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-accent/10 to-ring/10 animate-gradient-shift-reverse bg-[length:400%_400%]" />
      
      <Card className="w-full max-w-lg relative z-10 shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="https://www.aviatur.com/assets/images/logo/logo.svg" 
              alt="Aviatur Logo" 
              className="h-12 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Portal de Operadores
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Por favor diligencie el formulario. Validaremos estos datos para consultar el usuario.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form 
            action="https://aurorafront-qa.grupoaviatur.com/buscar/vuelos/" 
            method="post"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pre-filled fields - Office identifiers */}
              <div className="space-y-2">
                <Label htmlFor="externalId">External ID</Label>
                <Input 
                  type="text" 
                  id="externalId"
                  name="externalId" 
                  defaultValue="BOGVU28AT"
                  className="bg-muted/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="officeId">Office ID</Label>
                <Input 
                  type="text" 
                  id="officeId"
                  name="officeId" 
                  defaultValue="BOGVU2308"
                  className="bg-muted/50"
                />
              </div>

              {/* Empty fields - Operator info */}
              <div className="space-y-2">
                <Label htmlFor="operatorId">Operator ID</Label>
                <Input 
                  type="text" 
                  id="operatorId"
                  name="operatorId" 
                  placeholder="Ingrese su ID de operador"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="operatorName">Operator Name</Label>
                <Input 
                  type="text" 
                  id="operatorName"
                  name="operatorName" 
                  placeholder="Ingrese su nombre"
                  required
                />
              </div>

              {/* Pre-filled fields - Provider IDs */}
              <div className="space-y-2">
                <Label htmlFor="flightProviderIds">Air Adapters</Label>
                <Input 
                  type="text" 
                  id="flightProviderIds"
                  name="flightProviderIds" 
                  defaultValue="110"
                  className="bg-muted/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hotelProviderIds">Hotel Adapters</Label>
                <Input 
                  type="text" 
                  id="hotelProviderIds"
                  name="hotelProviderIds" 
                  defaultValue="42;54;58;68;75;74;85;87;88"
                  className="bg-muted/50"
                />
              </div>

              {/* Empty field - Airline */}
              <div className="space-y-2">
                <Label htmlFor="airline">Airline</Label>
                <Input 
                  type="text" 
                  id="airline"
                  name="airline" 
                  placeholder="Código de aerolínea (opcional)"
                />
              </div>

              {/* Empty field - Oracle user */}
              <div className="space-y-2">
                <Label htmlFor="USUARIO_ORACLE">Usuario Oracle</Label>
                <Input 
                  type="text" 
                  id="USUARIO_ORACLE"
                  name="USUARIO_ORACLE" 
                  placeholder="Ingrese su usuario Oracle"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
              size="lg"
            >
              Validar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
