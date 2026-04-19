"use client";

import { useState } from "react";
import Image from "next/image";
import { X, MapPin, Calendar, Clock } from "lucide-react";

export function AnnouncementBadge() {
  const [dismissed, setDismissed] = useState(false);
  const [showMap, setShowMap] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-white">
                  Семинар
                </span>
                <span className="text-amber-800 text-sm font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  26 апреля
                </span>
                <span className="text-amber-700 text-sm flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  11:00–13:00
                </span>
              </div>
              <p className="text-sm sm:text-base text-amber-900 font-medium">
                Семинар-практикум &laquo;Игры с кубиками для закрепления
                учебного материала&raquo;
              </p>
              <button
                onClick={() => setShowMap(true)}
                className="inline-flex items-center gap-1 mt-1 text-sm text-amber-700 hover:text-amber-900 underline underline-offset-2 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                Кирочная ул. д.23 — показать на карте
              </button>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="flex-shrink-0 p-1 rounded-lg text-amber-600 hover:text-amber-800 hover:bg-amber-100 transition-colors"
              aria-label="Закрыть объявление"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {showMap && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowMap(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Карта проезда к месту семинара"
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Как добраться
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Кирочная ул. д.23, Санкт-Петербург
                  </p>
                </div>
                <button
                  onClick={() => setShowMap(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Закрыть карту"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/seminar-map.jpg"
                alt="Карта проезда: от станции метро до Кирочная ул. д.23"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="p-4 sm:p-6 bg-amber-50">
              <div className="flex flex-wrap gap-4 text-sm text-amber-900">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  26 апреля 2025
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />с 11:00 до 13:00
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  Кирочная ул. д.23
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
