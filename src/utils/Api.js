export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //----SERVER CHECKS----//
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error:${res.status}`);
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, {
      headers: this._headers,
      ...options,
    }).then(this._checkResponse);
  }

  //----USER ROUTES----//
  getUserInfo() {
    return this._request("/users/me");
  }

  updateUserInfo({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  updateAvatar({ avatar }) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  //----CARD ROUTES----//
  getCards() {
    return this._request("/cards");
  }

  createCard({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }
}
