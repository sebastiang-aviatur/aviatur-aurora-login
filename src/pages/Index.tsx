import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti-boom";
import SupportButton from "@/components/SupportButton";

const DEFAULT_QA_URL = "https://b2taurora-qa.grupoaviatur.com/buscar/vuelos/";
const DEFAULT_LOCAL_URL = "https://aviaturb2tsym.com/buscar/vuelos/";

const Index = () => {
  const [operatorValue, setOperatorValue] = useState("");
  const [isAltEnvironment, setIsAltEnvironment] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [customUrl, setCustomUrl] = useState("");

  const baseUrl = isAltEnvironment ? DEFAULT_LOCAL_URL : DEFAULT_QA_URL;

  const postUrl = useMemo(() => {
    return customUrl.trim() !== "" ? customUrl : baseUrl;
  }, [customUrl, baseUrl]);

  const environmentTitle = isAltEnvironment
    ? "Local: aviaturb2tsym.com"
    : "QA: Portal de Operadores";

  const handleOperatorChange = (e) => {
    setOperatorValue(e.target.value.toUpperCase());
  };

  const handleCustomUrlChange = (e) => {
    setCustomUrl(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const form = e.target;

  //   // Submit manually to dynamic URL
  //   fetch(postUrl, {
  //     method: "POST",
  //     body: new FormData(form),
  //   }).then(() => {
  //     window.location.href = postUrl;
  //   });
  // };

  useEffect(() => {
    const handler = (e) => {
      if (e.shiftKey && e.key === "P") {
        setIsAltEnvironment((prev) => !prev);
        setCustomUrl(DEFAULT_LOCAL_URL); // Reset custom URL when toggling env
        setShowConfetti(false);
        setTimeout(() => setShowConfetti(true), 10);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <Confetti mode="boom" />
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-animated">
        <Card className="w-full max-w-lg relative z-10 shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl font-bold text-foreground">
              {environmentTitle}
            </CardTitle>

            {isAltEnvironment && (
              <div className="space-y-2">
                <Label htmlFor="customUrl">Url Personalizada</Label>
                <Input
                  type="text"
                  id="customUrl"
                  value={customUrl}
                  onChange={handleCustomUrlChange}
                  placeholder={baseUrl}
                />
              </div>
            )}

            {!isAltEnvironment && (
              <CardDescription className="text-muted-foreground">
                Por favor diligencie el formulario. Validaremos estos datos para consultar el usuario.
              </CardDescription>
            )}
          </CardHeader>

          <CardContent>
            <form
              action={postUrl}
              method="post"
              className="space-y-4"
            >
              {/* Your fields stay exactly the same */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pre-filled fields */}
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

                {/* Synced + uppercase fields */}
                <div className="space-y-2">
                  <Label htmlFor="operatorId">Operator ID</Label>
                  <Input
                    type="text"
                    id="operatorId"
                    name="operatorId"
                    placeholder="Ingrese su ID de operador"
                    value={operatorValue}
                    onChange={handleOperatorChange}
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
                    value={operatorValue}
                    onChange={handleOperatorChange}
                    required
                  />
                </div>

                {/* Pre-filled providers */}
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

                {/* Airline */}
                <div className="space-y-2">
                  <Label htmlFor="airline">Airline</Label>
                  <Input
                    type="text"
                    id="airline"
                    name="airline"
                    placeholder="Código de aerolínea (opcional)"
                  />
                </div>

                {/* Synced + uppercase */}
                <div className="space-y-2">
                  <Label htmlFor="USUARIO_ORACLE">Usuario Oracle</Label>
                  <Input
                    type="text"
                    id="USUARIO_ORACLE"
                    name="USUARIO_ORACLE"
                    placeholder="Ingrese su usuario Oracle"
                    value={operatorValue}
                    onChange={handleOperatorChange}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-[#025cb9] hover:bg-[#025cb9]/90 text-primary-foreground font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                size="lg"
              >
                Validar
              </Button>
            </form>
          </CardContent>
        </Card>
        
      </div>
      <SupportButton />
    </>
  );
};

export default Index;