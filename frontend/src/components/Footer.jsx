import React from "react";
import { useI18n } from "../i18n.jsx";

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="mt-16 pt-8 bg-gray-800 border-t border-stone-200" id="contact">
      <div className="container-narrow px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-stone-600">
          <div>
            <h4 className="font-semibold text-white mb-3">{t('contact')}</h4>
            <p className="text-gray-400">hammadulabibangalat@gmail.com</p>
            <p className="text-gray-400">0035-096987</p>
          </div>
          <div id="location">
            <h4 className="font-semibold text-white mb-3">{t('location')}</h4>
            <p className="text-gray-400">123 Anywhere St. Any City</p>
          </div>
          <div id="hours">
            <h4 className="font-semibold text-white mb-3">{t('hours')}</h4>
            <p className="text-gray-400">{t('monFri')}</p>
            <p className="text-gray-400">{t('satSun')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


