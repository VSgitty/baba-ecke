class MovieCollections {
    constructor() {
        this.collections = {
            finalDestination: this.getFinalDestinationMovies(),
            saw: this.getSawMovies(),
            scream: this.getScreamMovies(),
            halloween: this.getHalloweenMovies(),
            fridayThe13th: this.getFridayThe13thMovies(),
            nightmareOnElmStreet: this.getNightmareOnElmStreetMovies(),
            conjuring: this.getConjuringMovies(),
            insidious: this.getInsidiousMovies(),
            paranormalActivity: this.getParanormalActivityMovies(),
            purge: this.getPurgeMovies()
        };
    }

    getFinalDestinationMovies() {
        return [
            {
                title: "Final Destination",
                year: 2000,
                director: "James Wong",
                duration: 98,
                rating: 6.7,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://i0.wp.com/www.moviecon.eu/wp-content/uploads/2025/01/MovieCon-Sonderband-Final-Destination-SoftCover-Front-1.jpg"
            },
            {
                title: "Final Destination 2",
                year: 2003,
                director: "David R. Ellis",
                duration: 90,
                rating: 6.2,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/M/MV5BMDExYmRlZDItZWQ4OS00M2Y5LWE4MDAtYjRiZTk5MWE1YzExXkEyXkFqcGc@._V1_.jpg"
            },
            {
                title: "Final Destination 3",
                year: 2006,
                director: "James Wong",
                duration: 93,
                rating: 5.8,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://i.ebayimg.com/images/g/nwwAAOSwA3dYCqiu/s-l1200.jpg"
            },
            {
                title: "The Final Destination (4)",
                year: 2009,
                director: "David R. Ellis",
                duration: 82,
                rating: 5.2,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://musicart.xboxlive.com/7/25b51100-0000-0000-0000-000000000002/504/image.jpg"
            },
            {
                title: "Final Destination 5",
                year: 2011,
                director: "Steven Quale",
                duration: 92,
                rating: 5.9,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/9161TKXXi7L._AC_UF894,1000_QL80_.jpg"
            }
        ];
    }

    getSawMovies() {
        return [
            {
                title: "Saw",
                year: 2004,
                director: "James Wan",
                duration: 103,
                rating: 7.6,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://gfx.videobuster.de/archive/v/cP3c0Wg6wIhN8FFyqq3GwJwcz0lMkawpyUyRjA4JTJGaW1hmSUyRmpwZWclMkZkwjJlYWLMMWPfYjZjMmJm42TPvzAwrLIuanBnJnI9aKYwMA/saw-dvd-front-cover.jpg"
            },
            {
                title: "Saw II",
                year: 2005,
                director: "Darren Lynn Bousman",
                duration: 93,
                rating: 6.6,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://gfx.videobuster.de/archive/v/ct0q3DHoEkIZFHSdVoogEfgcz0lMkawpyUyRjA4JTJGaW1hmSUyRmpwZWclMkZjv2PEYc2txLY2YmFjMGRj7tNmZjNhZjYuanBnJnI9aKYwMA/saw-ii-blu-ray-front-cover.jpg"
            },
            {
                title: "Saw III",
                year: 2006,
                director: "Darren Lynn Bousman",
                duration: 108,
                rating: 6.2,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/61ryEwTHq1L._AC_UF894,1000_QL80_.jpg"
            },
            {
                title: "Saw IV",
                year: 2007,
                director: "Darren Lynn Bousman",
                duration: 93,
                rating: 5.9,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://musicart.xboxlive.com/7/5c251100-0000-0000-0000-000000000002/504/image.jpg"
            },
            {
                title: "Saw V",
                year: 2008,
                director: "David Hackl",
                duration: 92,
                rating: 5.8,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://de.web.img3.acsta.net/medias/nmedia/18/68/26/28/19283016.jpg"
            },
            {
                title: "Saw VI",
                year: 2009,
                director: "Kevin Greutert",
                duration: 90,
                rating: 6.0,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/919O7EHEuPL._AC_UF894,1000_QL80_DpWeblab_.jpg"
            },
            {
                title: "Saw 3D (VII)",
                year: 2010,
                director: "Kevin Greutert",
                duration: 90,
                rating: 5.5,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://gfx.videobuster.de/archive/v/cbH5RFzxTmYIsrmW63zg5lQcz0lMkawqCUyRjAzJTJGaW1hmSUyRmpwZWclMkZltzNkM2E3Y2RmMOa6ZjVkrTlkN2Ts0mRmZS5qcGcmcj1opjAw/saw-vii-vollendung-cover.jpg"
            },
            {
                title: "Jigsaw (Saw VIII)",
                year: 2017,
                director: "Michael Spierig",
                duration: 92,
                rating: 5.8,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://musicart.xboxlive.com/7/79965000-0000-0000-0000-000000000002/504/image.jpg"
            },
            {
                title: "Saw: Spiral (Saw IX)",
                year: 2021,
                director: "Darren Lynn Bousman",
                duration: 93,
                rating: 5.2,
                progress: 100,
                status: "completed",
                genres: "horror,thriller,crime",
                poster: "https://media1.jpc.de/image/w1155/front/0/4006680094656.jpg"
            },
            {
                title: "Saw X",
                year: 2023,
                director: "Kevin Greutert",
                duration: 118,
                rating: 6.7,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/M/MV5BYzBmMjRiMWMtNjQyZi00MWRhLTliYzctZDk5OGIxZTFlNDQ5XkEyXkFqcGc@._V1_.jpg"
            }
        ];
    }

    getScreamMovies() {
        return [
            {
                title: "Scream",
                year: 1996,
                director: "Wes Craven",
                duration: 111,
                rating: 7.4,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/61slqVYrdwL.jpg"
            },
            {
                title: "Scream II",
                year: 1997,
                director: "Wes Craven",
                duration: 120,
                rating: 6.3,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://paramount-media.de/image/get/id/1043/q/85/w/367/h/0/name/cover.jpg"
            },
            {
                title: "Scream III",
                year: 2000,
                director: "Wes Craven",
                duration: 116,
                rating: 5.6,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/71Iv91gOENL._AC_UF894,1000_QL80_.jpg"
            },
            {
                title: "Scream IV",
                year: 2011,
                director: "Wes Craven",
                duration: 111,
                rating: 6.2,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/61nQR9fZltL.jpg"
            },
            {
                title: "Scream V",
                year: 2022,
                director: "Matt Bettinelli-Olpin",
                duration: 114,
                rating: 6.3,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://gfx.videobuster.de/archive/v/cY45NgKr7cFG84jpsVAN-aAcz0lMkawsiUyRjAxJTJGaW1hmSUyRmpwZWclMkbxseFlN2M3YTFhxdgzZWVlZYveNGXKZTMuanBnJnI9Y3e_N3iUzjA/scream-5-poster.jpg"
            },
            {
                title: "Scream VI",
                year: 2023,
                director: "Matt Bettinelli-Olpin",
                duration: 122,
                rating: 6.5,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/71NtLPdYYPL.jpg"
            }
        ];
    }

    getHalloweenMovies() {
        return [
            {
                title: "Halloween",
                year: 1978,
                director: "John Carpenter",
                duration: 91,
                rating: 7.7,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://usercontent.one/wp/www.die-medienhuren.de/wp-content/uploads/2019/11/halloween.jpg"
            },
            {
                title: "Halloween II",
                year: 1981,
                director: "Rick Rosenthal",
                duration: 92,
                rating: 6.5,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://media1.jpc.de/image/w1155/front/0/9007150062972.jpg"
            },
            {
                title: "Halloween III: Season of the Witch",
                year: 1982,
                director: "Tommy Lee Wallace",
                duration: 98,
                rating: 5.2,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/710EFjo3EjL._AC_UF894,1000_QL80_.jpg"
            },
            {
                title: "Halloween IV: The Return of Michael Myers",
                year: 1988,
                director: "Dwight H. Little",
                duration: 88,
                rating: 5.8,
                progress: 70,
                status: "watching",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/7148sB-zBVL._AC_UF894,1000_QL80_DpWeblab_.jpg"
            },
            {
                title: "Halloween V: The Revenge of Michael Myers",
                year: 1989,
                director: "Dominique Othenin-Girard",
                duration: 96,
                rating: 4.9,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "hhttps://i.ebayimg.com/images/g/1dgAAOSwSHpio2fj/s-l1200.jpg"
            },
            {
                title: "Halloween VI: The Curse of Michael Myers",
                year: 1995,
                director: "Joe Chappelle",
                duration: 87,
                rating: 4.7,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/71JZKiJIAfL._UF1000,1000_QL80_.jpg"
            },
            {
                title: "Halloween H20 (VII): 20 Years Later",
                year: 1998,
                director: "Steve Miner",
                duration: 86,
                rating: 5.8,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://static.wikia.nocookie.net/halloweenmovie/images/f/f1/Halloween_H20_Twenty_Years_Later_poster.jpg/revision/latest?cb=20170731234510"
            },
            {
                title: "Halloween: Resurrection (VIII)",
                year: 2002,
                director: "Rick Rosenthal",
                duration: 94,
                rating: 3.9,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/61HJY8PwsxL.jpg"
            },
            {
                title: "Halloween (2007)",
                year: 2007,
                director: "Rob Zombie",
                duration: 109,
                rating: 6.0,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://i.ebayimg.com/00/s/NTAwWDM1MA==/z/PzUAAOSw451gh-G-/$_57.JPG"
            },
            {
                title: "Halloween II (2009)",
                year: 2009,
                director: "Rob Zombie",
                duration: 105,
                rating: 4.8,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/M/MV5BMjE2OTEzODI0NF5BMl5BanBnXkFtZTcwMTE4MTY2Mg@@._V1_FMjpg_UX1000_.jpg"
            },
            {
                title: "Halloween (2018)",
                year: 2018,
                director: "David Gordon Green",
                duration: 106,
                rating: 6.5,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/81Elm7OqDlL._AC_UF894,1000_QL80_.jpg"
            },
            {
                title: "Halloween Kills",
                year: 2021,
                director: "David Gordon Green",
                duration: 105,
                rating: 5.5,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://static.cinemagia.ro/img/resize/db/movie/27/58/133/halloween-kills-941109l-600x0-w-f7c003a8.jpg"
            },
            {
                title: "Halloween Ends",
                year: 2022,
                director: "David Gordon Green",
                duration: 111,
                rating: 5.0,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://m.media-amazon.com/images/I/81RnhzrTb2L._AC_UF894,1000_QL80_.jpg"
            }
        ];
    }

    getFridayThe13thMovies() {
        return [
            {
                title: "Friday the 13th",
                year: 1980,
                director: "Sean S. Cunningham",
                duration: 95,
                rating: 6.4,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Friday+the+13th"
            },
            {
                title: "Friday the 13th Part 2",
                year: 1981,
                director: "Steve Miner",
                duration: 87,
                rating: 6.1,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Friday+13th+Part+2"
            },
            {
                title: "Friday the 13th Part III",
                year: 1982,
                director: "Steve Miner",
                duration: 95,
                rating: 5.7,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Friday+13th+Part+3"
            },
            {
                title: "Friday the 13th: The Final Chapter",
                year: 1984,
                director: "Joseph Zito",
                duration: 91,
                rating: 6.0,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Friday+13th+Final"
            },
            {
                title: "Friday the 13th: A New Beginning",
                year: 1985,
                director: "Danny Steinmann",
                duration: 92,
                rating: 4.8,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Friday+13th+New+Beginning"
            },
            {
                title: "Friday the 13th Part VI: Jason Lives",
                year: 1986,
                director: "Tom McLoughlin",
                duration: 86,
                rating: 6.0,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Friday+13th+Jason+Lives"
            },
            {
                title: "Friday the 13th Part VII: The New Blood",
                year: 1988,
                director: "John Carl Buechler",
                duration: 88,
                rating: 5.2,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Friday+13th+New+Blood"
            },
            {
                title: "Friday the 13th Part VIII: Jason Takes Manhattan",
                year: 1989,
                director: "Rob Hedden",
                duration: 100,
                rating: 4.5,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Friday+13th+Manhattan"
            },
            {
                title: "Jason Goes to Hell: The Final Friday",
                year: 1993,
                director: "Adam Marcus",
                duration: 87,
                rating: 4.2,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Jason+Goes+Hell"
            },
            {
                title: "Jason X",
                year: 2001,
                director: "James Isaac",
                duration: 92,
                rating: 4.4,
                progress: 100,
                status: "completed",
                genres: "horror,sci-fi",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Jason+X"
            },
            {
                title: "Freddy vs. Jason",
                year: 2003,
                director: "Ronny Yu",
                duration: 97,
                rating: 5.7,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Freddy+vs+Jason"
            },
            {
                title: "Friday the 13th",
                year: 2009,
                director: "Marcus Nispel",
                duration: 97,
                rating: 5.5,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Friday+13th+2009"
            }
        ];
    }

    getNightmareOnElmStreetMovies() {
        return [
            {
                title: "A Nightmare on Elm Street",
                year: 1984,
                director: "Wes Craven",
                duration: 91,
                rating: 7.4,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B008B/ffffff?text=Nightmare+Elm+Street"
            },
            {
                title: "A Nightmare on Elm Street 2: Freddy's Revenge",
                year: 1985,
                director: "Jack Sholder",
                duration: 87,
                rating: 5.5,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B008B/ffffff?text=Nightmare+2"
            },
            {
                title: "A Nightmare on Elm Street 3: Dream Warriors",
                year: 1987,
                director: "Chuck Russell",
                duration: 96,
                rating: 6.6,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B008B/ffffff?text=Dream+Warriors"
            },
            {
                title: "A Nightmare on Elm Street 4: The Dream Master",
                year: 1988,
                director: "Renny Harlin",
                duration: 93,
                rating: 5.7,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B008B/ffffff?text=Dream+Master"
            },
            {
                title: "A Nightmare on Elm Street 5: The Dream Child",
                year: 1989,
                director: "Stephen Hopkins",
                duration: 89,
                rating: 5.1,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B008B/ffffff?text=Dream+Child"
            },
            {
                title: "Freddy's Dead: The Final Nightmare",
                year: 1991,
                director: "Rachel Talalay",
                duration: 89,
                rating: 4.9,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B008B/ffffff?text=Freddys+Dead"
            },
            {
                title: "Wes Craven's New Nightmare",
                year: 1994,
                director: "Wes Craven",
                duration: 112,
                rating: 6.4,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B008B/ffffff?text=New+Nightmare"
            },
            {
                title: "A Nightmare on Elm Street",
                year: 2010,
                director: "Samuel Bayer",
                duration: 95,
                rating: 5.2,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/8B008B/ffffff?text=Nightmare+2010"
            }
        ];
    }

    getConjuringMovies() {
        return [
            {
                title: "The Conjuring",
                year: 2013,
                director: "James Wan",
                duration: 112,
                rating: 7.5,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/2F4F4F/ffffff?text=The+Conjuring"
            },
            {
                title: "Annabelle",
                year: 2014,
                director: "John R. Leonetti",
                duration: 99,
                rating: 5.4,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/2F4F4F/ffffff?text=Annabelle"
            },
            {
                title: "The Conjuring 2",
                year: 2016,
                director: "James Wan",
                duration: 134,
                rating: 7.3,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/2F4F4F/ffffff?text=Conjuring+2"
            },
            {
                title: "Annabelle: Creation",
                year: 2017,
                director: "David F. Sandberg",
                duration: 109,
                rating: 6.5,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/2F4F4F/ffffff?text=Annabelle+Creation"
            },
            {
                title: "The Nun",
                year: 2018,
                director: "Corin Hardy",
                duration: 96,
                rating: 5.3,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/2F4F4F/ffffff?text=The+Nun"
            },
            {
                title: "The Curse of La Llorona",
                year: 2019,
                director: "Michael Chaves",
                duration: 93,
                rating: 5.3,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/2F4F4F/ffffff?text=La+Llorona"
            },
            {
                title: "Annabelle Comes Home",
                year: 2019,
                director: "Gary Dauberman",
                duration: 106,
                rating: 5.9,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/2F4F4F/ffffff?text=Annabelle+Home"
            },
            {
                title: "The Conjuring: The Devil Made Me Do It",
                year: 2021,
                director: "Michael Chaves",
                duration: 112,
                rating: 6.3,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/2F4F4F/ffffff?text=Conjuring+3"
            },
            {
                title: "The Nun II",
                year: 2023,
                director: "Michael Chaves",
                duration: 110,
                rating: 5.6,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/2F4F4F/ffffff?text=The+Nun+II"
            }
        ];
    }

    getInsidiousMovies() {
        return [
            {
                title: "Insidious",
                year: 2010,
                director: "James Wan",
                duration: 103,
                rating: 6.8,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/191970/ffffff?text=Insidious"
            },
            {
                title: "Insidious: Chapter 2",
                year: 2013,
                director: "James Wan",
                duration: 106,
                rating: 6.6,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/191970/ffffff?text=Insidious+2"
            },
            {
                title: "Insidious: Chapter 3",
                year: 2015,
                director: "Leigh Whannell",
                duration: 97,
                rating: 6.1,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/191970/ffffff?text=Insidious+3"
            },
            {
                title: "Insidious: The Last Key",
                year: 2018,
                director: "Adam Robitel",
                duration: 103,
                rating: 5.7,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/191970/ffffff?text=Insidious+Last+Key"
            },
            {
                title: "Insidious: The Red Door",
                year: 2023,
                director: "Patrick Wilson",
                duration: 107,
                rating: 5.5,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/191970/ffffff?text=Insidious+Red+Door"
            }
        ];
    }

    getParanormalActivityMovies() {
        return [
            {
                title: "Paranormal Activity",
                year: 2007,
                director: "Oren Peli",
                duration: 86,
                rating: 6.3,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/000080/ffffff?text=Paranormal+Activity"
            },
            {
                title: "Paranormal Activity 2",
                year: 2010,
                director: "Tod Williams",
                duration: 91,
                rating: 5.7,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/000080/ffffff?text=Paranormal+Activity+2"
            },
            {
                title: "Paranormal Activity 3",
                year: 2011,
                director: "Henry Joost",
                duration: 84,
                rating: 5.8,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/000080/ffffff?text=Paranormal+Activity+3"
            },
            {
                title: "Paranormal Activity 4",
                year: 2012,
                director: "Henry Joost",
                duration: 88,
                rating: 4.6,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/000080/ffffff?text=Paranormal+Activity+4"
            },
            {
                title: "Paranormal Activity: The Marked Ones",
                year: 2014,
                director: "Christopher Landon",
                duration: 84,
                rating: 5.0,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/000080/ffffff?text=PA+Marked+Ones"
            },
            {
                title: "Paranormal Activity: The Ghost Dimension",
                year: 2015,
                director: "Gregory Plotkin",
                duration: 88,
                rating: 4.6,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/000080/ffffff?text=PA+Ghost+Dimension"
            },
            {
                title: "Paranormal Activity: Next of Kin",
                year: 2021,
                director: "William Eubank",
                duration: 98,
                rating: 5.2,
                progress: 100,
                status: "completed",
                genres: "horror,thriller",
                poster: "https://via.placeholder.com/280x180/000080/ffffff?text=PA+Next+of+Kin"
            }
        ];
    }

    getPurgeMovies() {
        return [
            {
                title: "The Purge",
                year: 2013,
                director: "James DeMonaco",
                duration: 85,
                rating: 5.7,
                progress: 100,
                status: "completed",
                genres: "horror,thriller,action",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=The+Purge"
            },
            {
                title: "The Purge: Anarchy",
                year: 2014,
                director: "James DeMonaco",
                duration: 103,
                rating: 6.4,
                progress: 100,
                status: "completed",
                genres: "horror,thriller,action",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Purge+Anarchy"
            },
            {
                title: "The Purge: Election Year",
                year: 2016,
                director: "James DeMonaco",
                duration: 108,
                rating: 6.0,
                progress: 100,
                status: "completed",
                genres: "horror,thriller,action",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Purge+Election"
            },
            {
                title: "The First Purge",
                year: 2018,
                director: "Gerard McMurray",
                duration: 97,
                rating: 5.2,
                progress: 100,
                status: "completed",
                genres: "horror,thriller,action",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=First+Purge"
            },
            {
                title: "The Forever Purge",
                year: 2021,
                director: "Everardo Gout",
                duration: 103,
                rating: 5.4,
                progress: 100,
                status: "completed",
                genres: "horror,thriller,action",
                poster: "https://via.placeholder.com/280x180/8B0000/ffffff?text=Forever+Purge"
            }
        ];
    }

    // Methoden zum Hinzufügen der Sammlungen
    getAllMovies() {
        const allMovies = [];
        let id = 1;
        
        Object.values(this.collections).forEach(collection => {
            collection.forEach(movie => {
                allMovies.push({
                    ...movie,
                    id: id++,
                    added: Date.now() - (Math.random() * 31536000000) // Zufällige Zeit im letzten Jahr
                });
            });
        });
        
        return allMovies;
    }

    getCollection(name) {
        return this.collections[name] || [];
    }

    getCollectionNames() {
        return Object.keys(this.collections);
    }

    // Methode zum Importieren in den MovieManager
    importToMovieManager(movieManager, collections = null) {
        if (!movieManager) {
            console.error('MovieManager ist erforderlich');
            return;
        }

        let moviesToAdd = [];
        
        if (collections === null) {
            // Alle Sammlungen hinzufügen
            moviesToAdd = this.getAllMovies();
        } else if (Array.isArray(collections)) {
            // Spezifische Sammlungen hinzufügen
            collections.forEach(collectionName => {
                const collection = this.getCollection(collectionName);
                collection.forEach(movie => {
                    moviesToAdd.push({
                        ...movie,
                        id: movieManager.nextId++,
                        added: Date.now() - (Math.random() * 31536000000)
                    });
                });
            });
        }

        // Filme zum MovieManager hinzufügen
        movieManager.movies = [...movieManager.movies, ...moviesToAdd];
        movieManager.saveMovies();
        movieManager.renderMovies();
        
        return moviesToAdd.length;
    }
}

// Verwendungsbeispiele und Hilfsfunktionen
class MovieCollectionHelper {
    static addCollectionsToAdmin() {
        // Füge Buttons zum Admin-Panel hinzu
        const adminPanel = document.querySelector('.admin-panel');
        if (!adminPanel) return;

        const collectionsDiv = document.createElement('div');
        collectionsDiv.className = 'collections-section';
        collectionsDiv.innerHTML = `
            <h3 style="margin: 20px 0 10px 0; color: #333;">🎬 Filmsammlungen hinzufügen:</h3>
            <div class="collections-buttons" style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
                <button class="collection-btn" data-collection="finalDestination">Final Destination (5 Filme)</button>
                <button class="collection-btn" data-collection="saw">Saw (10 Filme)</button>
                <button class="collection-btn" data-collection="scream">Scream (6 Filme)</button>
                <button class="collection-btn" data-collection="halloween">Halloween (13 Filme)</button>
                <button class="collection-btn" data-collection="fridayThe13th">Friday the 13th (12 Filme)</button>
                <button class="collection-btn" data-collection="nightmareOnElmStreet">Nightmare on Elm Street (8 Filme)</button>
                <button class="collection-btn" data-collection="conjuring">Conjuring Universe (9 Filme)</button>
                <button class="collection-btn" data-collection="insidious">Insidious (5 Filme)</button>
                <button class="collection-btn" data-collection="paranormalActivity">Paranormal Activity (7 Filme)</button>
                <button class="collection-btn" data-collection="purge">The Purge (5 Filme)</button>
                <button class="collection-btn all-collections" style="background: #4caf50; font-weight: bold;">ALLE SAMMLUNGEN (80+ Filme)</button>
            </div>
        `;

        // CSS für Collection Buttons
        const style = document.createElement('style');
        style.textContent = `
            .collection-btn {
                padding: 8px 12px;
                border: none;
                border-radius: 8px;
                background: #9c27b0;
                color: white;
                cursor: pointer;
                font-size: 0.8rem;
                transition: all 0.3s;
            }
            .collection-btn:hover {
                background: #7b1fa2;
                transform: translateY(-2px);
            }
            .collections-section {
                border-top: 2px solid #ddd;
                padding-top: 15px;
                margin-top: 15px;
            }
        `;
        document.head.appendChild(style);

        adminPanel.appendChild(collectionsDiv);

        // Event Listeners für Collection Buttons
        const movieCollections = new MovieCollections();
        
        document.querySelectorAll('.collection-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const collectionName = e.target.dataset.collection;
                
                if (e.target.classList.contains('all-collections')) {
                    // Alle Sammlungen hinzufügen
                    const count = movieCollections.importToMovieManager(window.movieManager);
                    window.movieManager.showNotification(`${count} Filme aus allen Sammlungen hinzugefügt!`);
                } else if (collectionName) {
                    // Spezifische Sammlung hinzufügen
                    const count = movieCollections.importToMovieManager(window.movieManager, [collectionName]);
                    const collectionNames = {
                        'finalDestination': 'Final Destination',
                        'saw': 'Saw',
                        'scream': 'Scream',
                        'halloween': 'Halloween',
                        'fridayThe13th': 'Friday the 13th',
                        'nightmareOnElmStreet': 'Nightmare on Elm Street',
                        'conjuring': 'Conjuring Universe',
                        'insidious': 'Insidious',
                        'paranormalActivity': 'Paranormal Activity',
                        'purge': 'The Purge'
                    };
                    window.movieManager.showNotification(`${count} Filme aus ${collectionNames[collectionName]} hinzugefügt!`);
                }
            });
        });
    }
}

// Auto-Initialisierung wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Warte bis MovieManager geladen ist
    setTimeout(() => {
        if (window.movieManager) {
            MovieCollectionHelper.addCollectionsToAdmin();
        }
    }, 100);
});


