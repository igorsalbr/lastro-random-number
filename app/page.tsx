"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

export default function NumberLottery() {
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const [noRepeat, setNoRepeat] = useState(true);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawNumbers = async () => {
    setIsDrawing(true);
    setDrawnNumbers([]);

    if (animationEnabled) {
      // Animação de contagem regressiva
      for (let i = 3; i > 0; i--) {
        setDrawnNumbers([i]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Sortear números
    const numbers: number[] = [];
    const availableNumbers = Array.from(
      { length: maxNumber - minNumber + 1 },
      (_, i) => minNumber + i
    );

    for (let i = 0; i < quantity; i++) {
      if (availableNumbers.length === 0) break;

      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const drawnNumber = availableNumbers[randomIndex];
      numbers.push(drawnNumber);

      if (noRepeat) {
        availableNumbers.splice(randomIndex, 1);
      }
    }

    setDrawnNumbers(numbers);
    setIsDrawing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="mx-auto px-4 py-4">
          <div className="flex gap-3">
            <div className="flex items-center justify-center rounded-xl p-1">
              <img src="/placeholder-logo.svg" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-3xl bg-white/90 backdrop-blur-xl shadow-xl border border-gray-200/50 rounded-2xl">
          <CardContent className="p-8">
            {/* Title */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                Sorteador de números
              </h1>
              <p className="text-gray-500 text-sm font-medium">
                Gere números aleatórios de forma simples e elegante
              </p>
            </div>

            {/* Number Range Input */}
            <div className="bg-gray-50/80 rounded-2xl p-8 mb-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Quantidade
                  </label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-full text-center bg-white border-2 border-gray-200 rounded-2xl h-14 text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    min="1"
                  />
                </div>
                <div className="text-center">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Mínimo
                  </label>
                  <Input
                    type="number"
                    value={minNumber}
                    onChange={(e) =>
                      setMinNumber(parseInt(e.target.value) || 1)
                    }
                    className="w-full text-center bg-white border-2 border-gray-200 rounded-2xl h-14 text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="text-center">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Máximo
                  </label>
                  <Input
                    type="number"
                    value={maxNumber}
                    onChange={(e) =>
                      setMaxNumber(
                        Math.max(minNumber, parseInt(e.target.value) || 100)
                      )
                    }
                    className="w-full text-center bg-white border-2 border-gray-200 rounded-2xl h-14 text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">
                    Animação contagem regressiva
                  </span>
                  <span className="text-sm text-gray-500">
                    Mostra contagem antes do resultado
                  </span>
                </div>
                <Switch
                  checked={animationEnabled}
                  onCheckedChange={setAnimationEnabled}
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">
                    Não repetir números
                  </span>
                  <span className="text-sm text-gray-500">
                    Evita números duplicados no sorteio
                  </span>
                </div>
                <Switch
                  checked={noRepeat}
                  onCheckedChange={setNoRepeat}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>

            {/* Draw Button */}
            <Button
              onClick={drawNumbers}
              disabled={isDrawing}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl disabled:opacity-70"
            >
              {isDrawing ? "Sorteando..." : "🎲 Sortear números"}
            </Button>

            {/* Results */}
            {drawnNumbers.length > 0 && (
              <div className="mt-10 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
                  {isDrawing && animationEnabled
                    ? "🎯 Preparando..."
                    : "✨ Números sorteados"}
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {drawnNumbers.map((number, index) => (
                    <div
                      key={index}
                      className="bg-primary text-primary-foreground text-2xl font-bold w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl animate-bounce border-4 border-white/20"
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      {number}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
