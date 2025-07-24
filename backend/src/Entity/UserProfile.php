<?php

    namespace App\Entity;

    use App\Repository\UserProfileRepository;
    use Doctrine\ORM\Mapping as ORM;
    use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator; // Pour les UUIDs
    use Gedmo\Mapping\Annotation as Gedmo; // Pour Timestampable (createdAt/updatedAt)

    #[ORM\Entity(repositoryClass: UserProfileRepository::class)]
    #[ORM\Table(name: 'user_profiles')]
    class UserProfile
    {
        #[ORM\Id]
        #[ORM\Column(type: 'uuid', unique: true)]
        #[ORM\GeneratedValue(strategy: 'CUSTOM')]
        #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
        private ?string $id = null;

        #[ORM\OneToOne(inversedBy: 'userProfile', targetEntity: User::class, cascade: ['persist', 'remove'])]
        #[ORM\JoinColumn(nullable: false)]
        private ?User $owner = null;

        #[ORM\Column(length: 255, nullable: true)]
        private ?string $firstName = null;

        #[ORM\Column(length: 255, nullable: true)]
        private ?string $lastName = null;

        #[ORM\Column(length: 20, nullable: true)]
        private ?string $phoneNumber = null;

        #[ORM\Column(length: 255, nullable: true)]
        private ?string $address = null;

        #[ORM\Column(length: 100, nullable: true)] // NOUVEAU: Champ city
        private ?string $city = null;

        #[ORM\Column(length: 10, nullable: true)] // NOUVEAU: Champ zipCode
        private ?string $zipCode = null;

        #[ORM\Column(length: 100, nullable: true)] // NOUVEAU: Champ country
        private ?string $country = null;

        #[Gedmo\Timestampable(on: 'create')]
        #[ORM\Column(type: 'datetime_immutable', options: ['default' => 'CURRENT_TIMESTAMP'])]
        private ?\DateTimeImmutable $createdAt = null;

        #[Gedmo\Timestampable(on: 'update')]
        #[ORM\Column(type: 'datetime_immutable', options: ['default' => 'CURRENT_TIMESTAMP'])]
        private ?\DateTimeImmutable $updatedAt = null;


        public function getId(): ?string
        {
            return $this->id;
        }

        public function getOwner(): ?User
        {
            return $this->owner;
        }

        public function setOwner(User $owner): static
        {
            $this->owner = $owner;

            return $this;
        }

        public function getFirstName(): ?string
        {
            return $this->firstName;
        }

        public function setFirstName(?string $firstName): static
        {
            $this->firstName = $firstName;

            return $this;
        }

        public function getLastName(): ?string
        {
            return $this->lastName;
        }

        public function setLastName(?string $lastName): static
        {
            $this->lastName = $lastName;

            return $this;
        }

        public function getPhoneNumber(): ?string
        {
            return $this->phoneNumber;
        }

        public function setPhoneNumber(?string $phoneNumber): static
        {
            $this->phoneNumber = $phoneNumber;

            return $this;
        }

        public function getAddress(): ?string
        {
            return $this->address;
        }

        public function setAddress(?string $address): static
        {
            $this->address = $address;

            return $this;
        }

        // NOUVEAU: Getters et Setters pour city, zipCode, country
        public function getCity(): ?string
        {
            return $this->city;
        }

        public function setCity(?string $city): static
        {
            $this->city = $city;

            return $this;
        }

        public function getZipCode(): ?string
        {
            return $this->zipCode;
        }

        public function setZipCode(?string $zipCode): static
        {
            $this->zipCode = $zipCode;

            return $this;
        }

        public function getCountry(): ?string
        {
            return $this->country;
        }

        public function setCountry(?string $country): static
        {
            $this->country = $country;

            return $this;
        }

        public function getCreatedAt(): ?\DateTimeImmutable
        {
            return $this->createdAt;
        }

        public function setCreatedAt(\DateTimeImmutable $createdAt): static
        {
            $this->createdAt = $createdAt;

            return $this;
        }

        public function getUpdatedAt(): ?\DateTimeImmutable
        {
            return $this->updatedAt;
        }

        public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
        {
            $this->updatedAt = $updatedAt;

            return $this;
        }
    }