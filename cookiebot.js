// KGR Media Cookiebot
window.CookieConsent = {
  init: function(config) {
    // Zapisz konfigurację
    this.config = config;
    
    // Sprawdź czy użytkownik już wyraził zgodę
    const consent = localStorage.getItem('cookie_consent');
    
    if (!consent) {
      this.showModal();
    }
  },

  showModal: function() {
    // Utwórz modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 20px;
      border-radius: 10px;
      z-index: 9999;
      max-width: 400px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    // Dodaj treść
    modal.innerHTML = `
      <h3 style="margin: 0 0 10px 0; font-size: 16px;">Ustawienia plików cookie</h3>
      <p style="margin: 0 0 15px 0; font-size: 14px;">Ta strona używa plików cookie, aby zapewnić najlepsze wrażenia.</p>
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 10px;">
          <input type="checkbox" checked disabled> Niezbędne
        </label>
        <label style="display: block; margin-bottom: 10px;">
          <input type="checkbox" id="functional-cookies"> Funkcjonalne
        </label>
        <label style="display: block; margin-bottom: 10px;">
          <input type="checkbox" id="analytics-cookies"> Analityczne
        </label>
        <label style="display: block; margin-bottom: 10px;">
          <input type="checkbox" id="marketing-cookies"> Marketingowe
        </label>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <button id="accept-selected" style="
          background: #333;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
        ">Akceptuj wybrane</button>
        <button id="accept-all" style="
          background: #ffa500;
          color: black;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
        ">Akceptuj wszystkie</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Dodaj obsługę przycisków
    document.getElementById('accept-selected').addEventListener('click', () => {
      const consent = {
        necessary: true,
        functional: document.getElementById('functional-cookies').checked,
        analytics: document.getElementById('analytics-cookies').checked,
        marketing: document.getElementById('marketing-cookies').checked,
        date: new Date().toISOString(),
        id: btoa(Math.random().toString(36) + Math.random().toString(36)).slice(0, 32)
      };
      
      localStorage.setItem('cookie_consent', JSON.stringify(consent));
      modal.remove();
      this.showFloatingButton();
    });
    
    document.getElementById('accept-all').addEventListener('click', () => {
      const consent = {
        necessary: true,
        functional: true,
        analytics: true,
        marketing: true,
        date: new Date().toISOString(),
        id: btoa(Math.random().toString(36) + Math.random().toString(36)).slice(0, 32)
      };
      
      localStorage.setItem('cookie_consent', JSON.stringify(consent));
      modal.remove();
      this.showFloatingButton();
    });
  },

  showFloatingButton: function() {
    const button = document.createElement('div');
    button.style.cssText = `
      position: fixed;
      left: 20px;
      bottom: 20px;
      width: 40px;
      height: 40px;
      background: rgba(0, 0, 0, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9999;
    `;
    
    button.innerHTML = '🍪';
    button.title = 'Ustawienia plików cookie';
    
    button.addEventListener('click', () => {
      this.showModal();
    });
    
    document.body.appendChild(button);
  }
};
