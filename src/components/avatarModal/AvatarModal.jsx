import React from 'react';
import Image from 'next/image';
import "./avatarModal.css"

const AvatarModal = ({ onSelectAvatar, onClose, type }) => {
  let imageList = [];

  if (type === "avatars") {
    imageList = [
      '/images/man1.jpg',
      '/images/women1.jpg',
      '/images/man2.jpg',
      '/images/women2.jpg',
      '/images/man3.jpg',
      '/images/women3.jpg',
    ];
  } else if (type === "events") {
    imageList = [
      '/images/comida.jpg',
      '/images/hogar.jpg',
      '/images/pareja.jpg',
      '/images/viaje.jpg',
      '/images/otros.jpg',
    ];
  }

  return (
    <div className="AvatarModal">
      <div className="avatar-list">
        {imageList.map((image, index) => (
          <div key={index} onClick={() => onSelectAvatar(image)}>
            <Image src={image} alt={`${type} ${index + 1}`} width={100} height={100} />
          </div>
        ))}
      </div>
      <button onClick={onClose}>CERRAR</button>
    </div>
  );
};

export default AvatarModal;
